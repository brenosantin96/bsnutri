import { User } from '../types/User'
import { foods } from '../data/food'
import { Food } from '@/types/Food';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASEURL;


export const useApi = () => ({

    validateToken: async (token: string) => {
        const response = await axios.post(`${baseURL}/validate`, { token });
        return response.data;
    },

    signin: async (email: string, password: string) => {
        const response = await axios.post(`${baseURL}/login`, { email, password });
        return response.data;
    },

    logout: async () => {
        const response = await axios.post(`${baseURL}/logout`);
        return response.data;
    },

    createUser: async (user: User) => {
        const response = await axios.post(`${baseURL}/register`, user);
        return response.data;
    },

    loginUser: async (email: string, password: string) => {
        await console.log("Fazendo o login");
        return true;
    },

    getFoods: async () => {

        return foods;
    },

    getOneFood: async (id: number) => {
        let food = await foods.find(item => item.id === id);
        if (food) {
            return food;
        } else {
            alert("Nao foi possivel encontrar food com esse nome")
        }
    },

    createFood: async (newFood: Food) => {
        if (newFood) {
            let request = await axios.post("https://api/foods", newFood);
            return request.data;
        }
    },

    saveEditedFood: async (food: Food) => {

        if (food) {
            let request = await axios.put("https://api/foods", food);
            return request.data;
        }
    }



})