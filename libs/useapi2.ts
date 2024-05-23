import { User } from '../types/User'
import { foods } from '../data/food'
import { meals } from '@/data/meal';
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


export const useApi2 = (token?: string) => ({


    getFoods: async () => {

        try {

            const response = await axios.get(`${baseURL}/foodsByUser`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 404) {
                return null
            }

            else {
                return response.data
            }

        } catch (error) {

            console.log(error)

        }




    },

    getOneFood: async (id: number) => {

        let token = getCookie('token'); // => 'value'

        if (token === "" || !token || token === "noToken") {
            return;
        }

        try {

            const response = await axios.get(`${baseURL}/foodsByUser/${id}`, {
                headers: {
                    Authorization: `Bearer ${token} `
                }
            });

            if (response.status === 404) {
                return null
            }

            else {
                return response.data
            }

        } catch (error) {

            console.log(error)

        }


    },

    getManyFood: async (ids: number[]) => {

        let token = getCookie('token'); // => 'value'

        if (token === "" || !token || token === "noToken") {
            return;
        }

        try {
            const foods = await axios.get(`${baseURL}/foodsByUser`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (foods) {
                const foodsFound = foods.data.filter((item: Food) => ids.includes(item.id));
                if (foodsFound.length > 0) {
                    return foodsFound;
                } else {
                    alert("Não foi possível encontrar alimentos com os IDs fornecidos");
                    return [];
                }
            }

        } catch (error) {
            console.log("An error has ocurried", error)
        }

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


    getOneMeal: async (id: number) => {

        if (token === "" || !token || token === "noToken") {
            return;
        }

        try {

            const response = await axios.get(`${baseURL}/mealsByUser/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 404) {
                return null
            }
            else {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }

    },

    getMeals: async () => {

        const response = await axios.get(`${baseURL}/mealsByUser`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    },


    getInfoDay: async (id: string) => {

        if (token === "" || !token || token === "noToken") {
            return;
        }

        try {

            const response = await axios.get(`${baseURL}/infoNutriDay/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            if (response.status === 404) {
                return null
            }

            else {
                return response.data
            }

        } catch (error) {

            console.log(error)

        }

    },

    saveInfoNutriDay: async (id: string, date: Date, portion: number,
        protein: number, calories: number, grease: number, salt: number, finalizedDay: 0 | 1,
        foods_id?: number[], meals_id?: number[]) => {

        if (token === "" || !token || token === "noToken") {
            return;
        }

        let response = await axios.post(`${baseURL}/infoNutriDay`, {
            id, date, portion, protein, calories, grease, salt, finalizedDay, foods_id, meals_id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;

    },

    updateInfoNutriDay: async (id: string, date?: Date, portion?: number,
        protein?: number, calories?: number, grease?: number, salt?: number, finalizedDay?: 0 | 1,
        foods_id?: number[], meals_id?: number[]) => {

        if (token === "" || !token || token === "noToken") {
            return;
        }

        let response = await axios.put(`${baseURL}/infoNutriDay/${id}`, {
            id, date, portion, protein, calories, grease, salt, finalizedDay, foods_id, meals_id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;

    },

    deleteInfoNutriDay: async (id: string) => {

        if (token === "" || !token || token === "noToken") {
            return;
        }

        let response = await axios.delete(`${baseURL}/infoNutriDay/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;

    },

    getAllInfoDay2: async () => {

        if (token === "" || !token || token === "noToken") {
            return;
        }

        try {

            const response = await axios.get(`${baseURL}/infoNutriDay2`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 404) {
                return null
            }

            else {
                return response.data
            }

        } catch (error) {

            console.log(error)

        }

    },

})