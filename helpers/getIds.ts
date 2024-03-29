import { FoodInfoNutriDay } from "@/types/Food";
import { MealInfoNutriDay } from "@/types/Meal";

// Função genérica para extrair IDs de um array de objetos
export const extractIds = <T extends { id: number }>(objects: T[]): number[] => {
    return objects.map(obj => obj.id);
}


export const transformFoodQuantityInNumberInArray = (foodArray: FoodInfoNutriDay[]): number[] => {

    let newArray: number[] = []

    if (foodArray.length === 0) {
        return [];
    }

    foodArray.forEach((item) => {

        let qtde = item.qtde || 0; // Caso 'qtde' seja undefined, consideramos 0
        let id = item.id || 0; // Caso 'id' seja undefined, consideramos 0
        // Adiciona 'id' repetido 'qtde' vezes ao newArray
        newArray = newArray.concat(Array(qtde).fill(id));
    })

    return newArray;


}


export const transformMealQuantityInNumberInArray = (mealArray:MealInfoNutriDay[]): number[] => {

    let newArray: number[] = []

    if (mealArray.length === 0) {
        return [];
    }

    mealArray.forEach((meal) => {

        let qtde = meal.qtde || 0; // Caso 'qtde' seja undefined, consideramos 0
        let id = meal.id || 0; // Caso 'id' seja undefined, consideramos 0
        // Adiciona 'id' repetido 'qtde' vezes ao newArray
        newArray = newArray.concat(Array(qtde).fill(id));
    })

    return newArray;


}






// Exemplo de uso com objetos que têm uma propriedade "id"
const foods = [
    { id: 1, name: "Food 1" },
    { id: 2, name: "Food 2" },
];

const users = [
    { id: 101, name: "User 1" },
    { id: 102, name: "User 2" },
];

const foodIds = extractIds(foods);
const userIds = extractIds(users);

//console.log(foodIds); // [1, 2]
//console.log(userIds); // [101, 102]


//Criar funcao para remover ids repetidos:

export function removeDuplicatesFromArray(arr: number[]): number[] {
    const uniqueNumbersSet = new Set(arr); // Cria um Set com números únicos
    const uniqueNumbersArray = Array.from(uniqueNumbersSet); // Converte o Set de volta para um array
    return uniqueNumbersArray;
}

// Exemplo de uso:
const inputArray = [1, 3, 3, 3];
const uniqueArray = removeDuplicatesFromArray(inputArray);
//console.log(uniqueArray); // Saída: [1, 3]