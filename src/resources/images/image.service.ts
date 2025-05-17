import { Image } from "@/resources"; 
import { useAuthStore } from "@/contexts/AuthStore"; 

class ImageService {
    private baseURL: string = 'http://localhost:8080/v1/images';
    
    async buscar(query: string = "", extension: string = ""): Promise<Image[] | undefined> {
        if (typeof query !== "string" || typeof extension !== "string") {
            console.error("Parâmetros de busca inválidos.");
            return undefined; 
        }

        try {
            const url = `${this.baseURL}?extension=${encodeURIComponent(extension)}&query=${encodeURIComponent(query)}`;
            const response = await fetch(url, {
                credentials: 'include' // Inclui cookies automaticamente
            });

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
            // Verifica autenticação antes de continuar
            const { isAuthenticated, checkSession } = useAuthStore.getState();
            
            if (!isAuthenticated) {
                await checkSession();
                if (!useAuthStore.getState().isAuthenticated) {
                    throw new Error('Usuário não autenticado');
                }
            }

            const response = await fetch(this.baseURL, {
                method: 'POST',
                body: dados,
                credentials: 'include' // Inclui cookies automaticamente
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
                return locationHeader;
            }

            const responseBody = await response.text();
            if (responseBody) {
                return responseBody;
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
    
    // Método adicional para deletar imagem
    async deletar(imageId: number): Promise<void> {
        try {
            const { isAuthenticated } = useAuthStore.getState();
            
            if (!isAuthenticated) {
                throw new Error('Usuário não autenticado');
            }

            const response = await fetch(`${this.baseURL}/${imageId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Falha ao deletar imagem');
            }
        } catch (error) {
            console.error('Erro ao deletar imagem:', error);
            throw error;
        }
    }
}

// Hook para usar o serviço
export const useImageService = () => {
    return new ImageService();
};