import { User } from '../types/User'
import { foods } from '../data/food'

export const useApi = () => ({

    createUser: async (user: User) => {
        await console.log("Enviando e criando usuario: ", user);
        return true;
    },

    loginUser: async (email: string, password: string) => {
        await console.log("Fazendo o login");
        return true;
    },

    getFoods: async () => {
        
        return foods;
    },



})