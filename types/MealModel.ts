import { Food } from "./Food";
import { Meal } from "./Meal";


const food1: Food = {
    id: 1,
    name: 'Broccoli',
    portion: 100,
    protein: 2.8,
    calories: 55,
    grease: 0.6,
    salt: 0.1,
    image: '/default.png',
};

const food2: Food = {
    id: 2,
    name: 'Chicken Breast',
    portion: 100,
    protein: 31,
    calories: 165,
    grease: 3.6,
    salt: 0.1,
    image: '/default.png',
};

const food3: Food = {
    id: 3,
    name: 'Quinoa',
    portion: 100,
    protein: 14,
    calories: 120,
    grease: 1.9,
    salt: 0.0,
    image: '/default.png',
};

const food4: Food = {
    id: 4,
    name: 'Salmon',
    portion: 100,
    protein: 25,
    calories: 206,
    grease: 13,
    salt: 0.6,
    image: '/default.png',
};

export const foodModels = [food1, food2, food3, food4]

export const mealExample: Meal = {
    id: 5646545678945,
    isMeal: true,
    name: "5646545678945",
    portion: 100,
    protein: 10,
    calories: 10,
    grease: 10,
    salt: 10,
    foods: foodModels
}