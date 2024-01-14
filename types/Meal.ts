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

type mealsFoods = {
    meals_id: number,
    foods_id: number,
    foods: Food
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
    meals_has_foods: mealsFoods[];
}

export type MealWithOnlyId2 = {
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

