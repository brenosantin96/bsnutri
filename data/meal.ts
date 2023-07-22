import { Meal } from "@/types/Meal";
import {foods} from './food'

const [food1, food2, food3, food4] = foods;

export const meals: Meal[] = [
    { id: 1, name: "Arroz con alubias", portion: 65,  protein: 13, calories: 200, grease: 2, salt: 1, image: "/default.png", foods: [food1, food2] },
    { id: 2, name: "Carne con Patatas", portion: 65,  protein: 13, calories: 200, grease: 2, salt: 1, image: "/default.png", foods: [food1, food4] },
    { id: 3, name: "Arroz, Macarrone y Alubias ", portion: 65,  protein: 13, calories: 200, grease: 2, salt: 1, image: "/default.png", foods: [food2, food3] },
    { id: 4, name: "Arroz con Pescado y Ensalada", portion: 65,  protein: 13, calories: 200, grease: 2, salt: 1, image: "/default.png", foods: [food3, food4] },
]