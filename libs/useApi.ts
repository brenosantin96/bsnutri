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

        const response = await axios.get(`${baseURL}/foodsByUser`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;

    },

    getOneFood: async (id: number) => {

        let token = getCookie('token'); // => 'value'

        if (token === "" || !token || token === "noToken") {
            return;
        }

        const response = await axios.get(`${baseURL}/foodsByUser/${id}`, {
            headers: {
                Authorization: `Bearer ${token} `
            }
        });

        return response.data;
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

    createFood: async (name: string, portion: number, protein: number, calories: number, grease: number, salt: number, image: string = '/default.png') => {

        let token = getCookie('token'); // => 'value'

        if (token === "" || !token || token === "noToken") {
            return;
        }

        if (name !== "" || !portion || !protein || !calories || !grease || !salt) {
            let response = await axios.post(`${baseURL}/foodsByUser`, {
                name, portion, protein, calories, grease, salt, image
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        }


    },

    saveEditedFood: async (id: number, portion?: number, protein?: number, calories?: number, grease?: number, salt?: number, image: string = '/default.png') => {

        let token = getCookie('token'); // => 'value'

        if (token === "" || !token || token === "noToken") {
            return;
        }

        let response = await axios.put(`${baseURL}/foodsByUser/${id}`, {
            portion, protein, calories, grease, salt, image
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;



    },

    deleteFood: async (id: number) => {

        let token = getCookie('token'); // => 'value'

        if (token === "" || !token || token === "noToken") {
            return;
        }

        let response = await axios.delete(`${baseURL}/foodsByUser/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;

    },

    getMeals: async () => {

        let token = getCookie('token'); // => 'value'

        const response = await axios.get(`${baseURL}/mealsByUser`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    },

    getOneMeal: async (id: number) => {

        let token = getCookie('token'); // => 'value'

        if (token === "" || !token || token === "noToken") {
            return;
        }

        const response = await axios.get(`${baseURL}/mealsByUser/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;

    },

    createMeal: async (name: string, portion: number, protein: number, calories: number, grease: number, salt: number, foods_id: number[], image: string = "/default.png") => {

        let token = getCookie('token'); // => 'value'

        if (token === "" || !token || token === "noToken") {
            return;
        }

        if (name !== "" || !portion || !protein || !calories || !grease || !salt || foods.length !== 0) {
            let response = await axios.post(`${baseURL}/mealsByUser`, {
                name, portion, protein, calories, grease, salt, image, foods_id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        }
    },

    saveEditedMeal: async (id: number, name: string, portion: number, protein: number, calories: number, grease: number, salt: number, foods_id: number[], image: string = "/default.png") => {

        let token = getCookie('token'); // => 'value'

        if (token === "" || !token || token === "noToken") {
            return;
        }

        let response = await axios.put(`${baseURL}/mealsByUser/${id}`, {
            name, portion, protein, calories, grease, salt, image, foods_id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;

    },

    deleteMeal: async (id: number) => {
       
        let token = getCookie('token'); // => 'value'

        if (token === "" || !token || token === "noToken") {
            return;
        }

        let response = await axios.delete(`${baseURL}/mealsByUser/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;

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