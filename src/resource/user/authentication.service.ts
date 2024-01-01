import { AcessToken, Credentials, User, UserSessionToken } from "./users.resource";

class AuthService{
    baseURL: string = "http://localhost:8080/v1/users";
    static AUTH_PARAM: string = "_auth" ;

    async authenticate(credentials : Credentials){
        const response = await fetch(this.baseURL + "/auth",{
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json"

            }
        });

        if(response.status == 401){
            throw new Error("User or password aere incorrect!");
        }

        return await response.json
    }  
}
 export const useAuth = () => new AuthService();