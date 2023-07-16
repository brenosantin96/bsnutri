import { User } from '../types/User'
import { foods } from '../data/food'
import { Food } from '@/types/Food';
import axios from 'axios';

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

    createFood: async (newFood: Food) => {
        if (newFood) {
            let request = await axios.post("https://api/foods", newFood);
            return request.data;
        }
    }



})