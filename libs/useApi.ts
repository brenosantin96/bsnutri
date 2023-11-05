import { User } from '../types/User'
import { foods } from '../data/food'
import { meals } from '@/data/meal';
import { infoDayData } from '@/data/InfoNutritionalDay';
import { Food } from '@/types/Food';
import axios from 'axios';
import { Meal } from '@/types/Meal';
import { InfoNutritionalDay } from '@/types/InfoNutritionalDay';
import { getCookie, setCookie } from 'cookies-next';
import API from './API';
import useAxiosAuth from './useAxiosAuth';
import { config } from 'process';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/Auth/AuthContext';

const baseURL = process.env.NEXT_PUBLIC_BASEURL;


export const useApi = () => ({



    getUsers: async () => {
        const response = await axios.get(`${baseURL}/users`);
        return response.data;

    },

    validateToken: async (token: string) => {
        const response = await axios.post(`${baseURL}/validate`, { token });
        return response.data;
    },


    signin: async (email: string, passwordReq: string) => {
        const response = await axios.post(`${baseURL}/login`, { email, passwordReq });
        return response.data;
    },

    logout: async () => {
        const response = await axios.post(`${baseURL}/logout`);
        return response.data;
    },

    signUp: async (user: User) => {
        const response = await axios.post(`${baseURL}/register`, user);
        return response.data;
    },

    loginUser: async (email: string, password: string) => {
        await console.log("Fazendo o login");
        return true;
    },

    getFoods: async () => {

        let token = getCookie('token'); // => 'value'
        console.log(token);          


        const response = await axios.post(`${baseURL}/foodsByUser`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;

    },

    getOneFood: async (id: number) => {
        let food = await foods.find(item => item.id === id);
        if (food) {
            return food;
        } else {
            return;
        }
    },

    getManyFood: async (ids: number[]) => {
        const foodsFound = foods.filter(item => ids.includes(item.id));

        if (foodsFound.length > 0) {
            return foodsFound;
        } else {
            alert("Não foi possível encontrar alimentos com os IDs fornecidos");
            return [];
        }

    },

    createFood: async (name: string, portion: number, protein: number, calories: number, grease: number, salt: number, image: string = 'default.png') => {
        if (name !== "" || !portion || !protein || !calories || !grease || !salt) {
            let request = await API.post(`${baseURL}/foodsByUser`, {
                name, portion, protein, calories, grease, salt, image
            });

            return request.data;
        }


    },

    saveEditedFood: async (food: Food) => {

        if (food) {
            let request = await axios.put("https://api/foods", food);
            return request.data;
        }
    },

    deleteFood: async (id: number) => {
        return true;

    },

    getMeals: async () => {

        return meals;
    },

    getOneMeal: async (id: number) => {
        let meal = await meals.find(item => item.id === id);
        if (meal) {
            return meal;
        } else {
            return;
        }
    },

    createMeal: async (newMeal: Meal) => {
        if (newMeal) {
            let request = await axios.post("https://api/meals", newMeal);
            return request.data;
        }
    },

    saveEditedMeal: async (meal: Meal) => {

        if (meal) {
            console.log(meal);
            //let request = await axios.put("https://api/foods", meal);
            //return request.data;
        }
    },

    deleteMeal: async (id: number) => {
        return true;

    },

    getAllInfoDay: async () => {
        //enviar ID do usuario para pegar de todos os dias.
        return infoDayData;
    },

    getInfoDay: async (id: string) => {
        let infoDay = await infoDayData.find(item => item.id === id);
        if (infoDay) {
            return infoDay;
        } else {
            return null;

        }
    },





})