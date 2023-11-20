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


export const useApi2 = (token?: string) => ({


    getFoods: async () => {

        const response = await axios.get(`${baseURL}/foodsByUser`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;

    },

    getOneMeal: async (id: number) => {
        
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





})