import { Food } from "./Food";
import { Meal } from "./Meal";

export type InfoNutritionalDay = {
    id: string;
    date: string;
    portion: number;
    protein: number;
    calories: number;
    grease: number;
    salt: number;
    finalizedDay: boolean;
    combinedFoods: (Food | Meal)[];
    
}