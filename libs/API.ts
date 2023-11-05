import { AuthContext } from '@/contexts/Auth/AuthContext';
import axios from 'axios';
import { getCookie, getCookies } from 'cookies-next';
import { useContext } from 'react';

//const token = getCookie('key'); // => 'value'


const baseURL = process.env.NEXT_PUBLIC_BASEURL;

const API = axios.create({
  baseURL: `${baseURL}`,
  

});


export default API;
