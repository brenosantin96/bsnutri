import { User } from '../types/User'

export const useApi = () => ({

    createUser: async (user: User) => {
        await console.log("Enviando e criando usuario: ", user);
        return true;
    },

    loginUser: async (email: string, password: string) => {
        await console.log("Fazendo o login");
        return true;
    },



})