import { Food } from '../types/Food'

export type Meal = {
    id: number,
    isMeal: boolean;
    name: string;
    portion: number;
    protein: number;
    calories: number;
    grease: number;
    salt: number;
    foods: Food[];
    image? : string;
}

export type MealWithOnlyId = {
    id: number,
    isMeal: boolean;
    name: string;
    portion: number;
    protein: number;
    calories: number;
    grease: number;
    salt: number;
    foods_id: number[];
}


