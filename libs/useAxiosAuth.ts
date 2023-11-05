import axios from "axios";
import { getCookie, getCookies } from "cookies-next";
import { useEffect } from "react";
import API from "./API";


const useAxiosAuth = () => {

    const token = getCookie("token");
    console.log("Token pegado do useAxiosToken em GetCookie: ", token)

    useEffect(()=> {
        const requestIntercept = API.interceptors.request.use((config) => {
            
            if(!config.headers["Authorization"]){
                config.headers["Authorization"] = `Bearer ${token}`
            }

            return config;
        });


        return () =>{
            API.interceptors.request.eject(requestIntercept)
        }

    }, [token]);

    return API;

};

export default useAxiosAuth