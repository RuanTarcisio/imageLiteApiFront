import { Image } from "../types"; 
import { useAuth } from "@/resources";

class ImageService {
    baseURL: string = 'http://localhost:8080/v1/images';
    baseURLUser: string = `${this.baseURL}/v1/users`;
    authService = useAuth();
    
    private async getValidAuthToken(): Promise<string> {
        const token = this.authService.getAccessToken();
        
        if (!token || !this.authService.isSessionValid()) {
            throw new Error('Sessão expirada ou token inválido');
        }
        return token;
    }
    

    async buscar(query: string = "", extension: string = ""): Promise<Image[] | undefined> {
        if (typeof query !== "string" || typeof extension !== "string") {
            console.error("Parâmetros de busca inválidos.");
            return undefined; 
        }

        try {
            const url = `${this.baseURL}?extension=${encodeURIComponent(extension)}&query=${encodeURIComponent(query)}`;
            const response = await fetch(url);

            if (!response.ok) {
                console.error(`Erro na requisição: ${response.statusText}`);
                return undefined;
            }

            return await response.json();
        } catch (error) {
            console.error("Erro ao buscar imagens:", error);
            return undefined; 
        }
    }

    async salvar(dados: FormData): Promise<string> {
        try {
            const token = await this.getValidAuthToken();
            
            const response = await fetch(this.baseURL, {
                method: 'POST',
                body: dados,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = 'Falha ao salvar imagem';
                
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.message || errorMessage;
                } catch {
                    errorMessage = errorText || errorMessage;
                }
                
                throw new Error(errorMessage);
            }
     
            const locationHeader = response.headers.get('Location');
            if (locationHeader) {
                return locationHeader; // Retorna a URL do cabeçalho Location
            }

            const responseBody = await response.text();
            if (responseBody) {
                return responseBody;  // Retorna o corpo caso haja alguma URL nele
            }
    
            throw new Error('A URL da imagem não foi retornada pelo servidor');
        } catch (error) {
            console.error('Erro no ImageService:', error);
            throw new Error(
                error instanceof Error 
                    ? error.message 
                    : 'Ocorreu um erro ao tentar salvar a imagem'
            );
        }
    }
    
}

export const useImageService = () => new ImageService();