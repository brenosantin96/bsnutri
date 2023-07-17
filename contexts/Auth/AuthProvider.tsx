import { User } from "@/types/User";
import { useState } from "react"
import { AuthContext } from "./AuthContext"
import { ProviderType } from "./Types"
import { useApi } from '../../libs/useApi'



export const AuthProvider = ({ children }: ProviderType) => {

    //O authcontext.provider reclama se nao passamos os valores defininidos no type do contexto.

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState("");
    const api = useApi();

    const signIn = async (email: string, password: string) => {

        const data = await api.signin(email, password);

        if (data.status === true && data.token) {
            setUser(data.user);
            setToken(data.token);
            console.log("TOKEN: ", data.token);
            return true;
        }

        return false;
    }

    const signOut = async () => {
        await api.logout();
        setUser(null);
    }

    const handleToken = async (tokenString: string) => {
        setToken(tokenString);
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, token, handleToken }} >
            {children}
        </AuthContext.Provider>
    )

}