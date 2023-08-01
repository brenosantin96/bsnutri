import { Food } from '../types/Food'
import { Meal } from '@/types/Meal'
import { InfoNutritionalDay } from '@/types/InfoNutritionalDay'

export const infoDayData: InfoNutritionalDay[] = [{
    id: '20-jul-2023',
    calories: 20,
    date: new Date(2023, 6, 20).toISOString(),
    grease: 20,
    portion: 20,
    protein: 20,
    salt: 20,
    combinedFoods: [
        {
            id: 1,
            name: "Huevo",
            portion: 10,
            protein: 10,
            calories: 10,
            grease: 10,
            salt: 10,
            image: "/food1.png"
        },
        {
            id: 2,
            name: "Chocolate",
            portion: 20,
            protein: 20,
            calories: 20,
            grease: 20,
            salt: 20,
            image: "/food2.png"
        },
        {
            id: 3,
            name: "Tomate",
            portion: 30,
            protein: 30,
            calories: 30,
            grease: 30,
            salt: 30,
            image: "/food3.png"
        },
        {
            id: 2,
            name: "Carne con Patatas",
            isMeal: true,
            portion: 65,
            protein: 13,
            calories: 200,
            grease: 2,
            salt: 1,
            image: "/meatPotatoes.png",
            foods: [
                {
                    id: 1,
                    name: "Huevo",
                    portion: 10,
                    protein: 10,
                    calories: 10,
                    grease: 10,
                    salt: 10,
                    image: "/food1.png"
                },
                {
                    id: 4,
                    name: "Pescado",
                    portion: 40,
                    protein: 40,
                    calories: 40,
                    grease: 40,
                    salt: 40,
                    image: "/food4.png"
                }
            ]
        },
        {
            id: 4,
            name: "Arroz con Pescado y Ensalada",
            isMeal: true,
            portion: 65,
            protein: 13,
            calories: 200,
            grease: 2,
            salt: 1,
            image: "/fishSaladRice.png",
            foods: [
                {
                    id: 3,
                    name: "Tomate",
                    portion: 30,
                    protein: 30,
                    calories: 30,
                    grease: 30,
                    salt: 30,
                    image: "/food3.png"
                },
                {
                    id: 4,
                    name: "Pescado",
                    portion: 40,
                    protein: 40,
                    calories: 40,
                    grease: 40,
                    salt: 40,
                    image: "/food4.png"
                }
            ]
        }
    ]

}]