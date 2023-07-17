import { createContext } from 'react';
import { AuthContextType } from '../Auth/Types'


export const AuthContext = createContext<AuthContextType>(null!);