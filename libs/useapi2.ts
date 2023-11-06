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
        console.log("TOKEN PEGADO GETFOODS: ", token);

      
        const response = await axios.get(`${baseURL}/foodsByUser`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJicmVub0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRncVZFQVM5Mm81S21SU3lGZ2ZPLmkuazd1Q05xLnR3cU04cnRZOXcvNnI5d1VIVjVMSmtELiIsImlhdCI6MTY5OTIxNzI3MywiZXhwIjoxNzAxODA5MjczfQ.F98pGoznpVaVVwnTp70B61LwadTApVYPv6getmAZReI`
            }
        });

        return response.data;

    }




})