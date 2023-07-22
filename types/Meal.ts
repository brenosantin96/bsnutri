import { Food } from '../types/Food'

export type Meal = {
    id: number,
    name: string;
    portion: number;
    protein: number;
    calories: number;
    grease: number;
    salt: number;
    foods: Food[];
    image? : string;
}


