import { User } from "@/types/User";
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { ProviderType } from "./Types";
import { useApi } from "../../libs/useApi";
import { setCookie } from 'cookies-next';
import axios, { AxiosInstance } from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASEURL;



export const AuthProvider = ({ children }: ProviderType) => {
  //O authcontext.provider reclama se nao passamos os valores defininidos no type do contexto.

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const api = useApi();


  const baseURL = process.env.NEXT_PUBLIC_BASEURL;

 
  const signOut = async () => {
    await api.logout();
    setUser(null);
  };

  const handleToken = async (tokenString: string) => {
    setToken(tokenString);
    localStorage.setItem("token", tokenString)
    setCookie("token", tokenString);
  };

  const isLogged = () => {
    return token ? true : false;
  };

  const signIn = async (email: string, passwordReq: string) => {

    const data = await api.signin(email, passwordReq);

    console.log("VALOR DATA: ", data);
    //value retornado: VALOR DATA:  {msg: 'Unable to log in', status: false}

    if (data.status === true && data.token) {
      setUser(data.user);
      handleToken(data.token);
      return true;
    }

    return false;
  };



  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, token, handleToken, isLogged  }}
    >
      {children}
    </AuthContext.Provider>
  );
};
