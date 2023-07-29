import { Meal } from "@/types/Meal";
import {foods} from './food'

const [food1, food2, food3, food4, food5, food6] = foods;

export const meals: Meal[] = [
    { id: 1, name: "Arroz con alubias", isMeal: true, portion: 65,  protein: 13, calories: 200, grease: 2, salt: 1, image: "/rice.png", foods: [food1, food2] },
    { id: 2, name: "Carne con Patatas", isMeal: true, portion: 65,  protein: 13, calories: 200, grease: 2, salt: 1, image: "/meatPotatoes.png", foods: [food1, food4] },
    { id: 3, name: "Arroz, Macarrone y Alubias ", isMeal: true, portion: 65,  protein: 13, calories: 200, grease: 2, salt: 1, image: "/ricebeanspasta.png", foods: [food2, food3] },
    { id: 4, name: "Arroz con Pescado y Ensalada", isMeal: true, portion: 65,  protein: 13, calories: 200, grease: 2, salt: 1, image: "/fishSaladRice.png", foods: [food3, food4] },
]