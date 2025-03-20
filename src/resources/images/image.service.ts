import { Image } from "./image.resource";

class ImageService {
    baseURL: string = 'http://localhost:8080/v1/images';

    async buscar(query: string = "", extension: string = ""): Promise<Image[] | undefined> {
        if (typeof query !== "string" || typeof extension !== "string") {
            console.error("Parâmetros de busca inválidos.");
            return undefined; // Retorna undefined em vez de lançar uma exceção
        }

        try {
            const url = `${this.baseURL}?extension=${encodeURIComponent(extension)}&query=${encodeURIComponent(query)}`;
            const response = await fetch(url);

            if (!response.ok) {
                console.error(`Erro na requisição: ${response.statusText}`);
                return undefined; // Retorna undefined em caso de erro na requisição
            }

            return await response.json();
        } catch (error) {
            console.error("Erro ao buscar imagens:", error);
            return undefined; // Retorna undefined em caso de erro
        }
    }

    async salvar(dados: FormData): Promise<string | undefined> {
        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                body: dados,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                console.error(`Erro na requisição: ${response.statusText}`);
                return undefined; // Retorna undefined em caso de erro na requisição
            }

            return response.headers.get('location') ?? undefined;
        } catch (error) {
            console.error("Erro ao salvar imagem:", error);
            return undefined; // Retorna undefined em caso de erro
        }
    }
}

export const useImageService = () => new ImageService();








// import { Image } from "./image.resource";

// class ImageService {
//     baseURL: string = 'http://localhost:8080/v1/images';

//     async buscar(query: string = "", extension: string = ""): Promise<Image[]> {
//         if (typeof query !== "string" || typeof extension !== "string") {
//             throw new Error("Parâmetros de busca inválidos.");
//         }

//         try {
//             const url = `${this.baseURL}?extension=${encodeURIComponent(extension)}&query=${encodeURIComponent(query)}`;
//             const response = await fetch(url);

//             if (!response.ok) {
//                 throw new Error(`Erro na requisição: ${response.statusText}`);
//             }

//             return await response.json();
//         } catch (error) {
//             console.error("Erro ao buscar imagens:", error);
//             throw new Error("Não foi possível carregar as imagens.");
//         }
//     }

//     async salvar(dados: FormData): Promise<string> {
//         try {
//             const response = await fetch(this.baseURL, {
//                 method: 'POST',
//                 body: dados,
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`Erro na requisição: ${response.statusText}`);
//             }

//             return response.headers.get('location') ?? '';
//         } catch (error) {
//             console.error("Erro ao salvar imagem:", error);
//             throw new Error("Não foi possível salvar a imagem.");
//         }
//     }
// }

// export const useImageService = () => new ImageService();