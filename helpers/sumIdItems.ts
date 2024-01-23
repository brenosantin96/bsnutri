import { Food, FoodInfoNutriDay } from "@/types/Food";
import { Meal, MealInfoNutriDay } from "@/types/Meal";
import { foodsInfoNutriDay, mealsInfoNutriDay } from "@/types/foodsInfoNutriDay";

export const createFoodArrayWithQnt = (arr: Food[]): FoodInfoNutriDay[] => {
    const result: FoodInfoNutriDay[] = [];

    arr.forEach((food) => {
        const existingFood = result.find((f) => f.id === food.id);

        if (existingFood) {
            existingFood.qtde += 1;
        } else {
            const newFood: FoodInfoNutriDay = { ...food, qtde: 1 };
            result.push(newFood);
        }
    });

    return result;
};

export const createMealArrayWithQnt = (arr: Meal[]): MealInfoNutriDay[] => {
    const result: MealInfoNutriDay[] = [];

    arr.forEach((meal) => {
        const existingMeal = result.find((m) => m.id === meal.id);

        if (existingMeal) {
            existingMeal.qtde += 1;
        } else {
            const newFood: MealInfoNutriDay = { ...meal, qtde: 1 };
            result.push(newFood);
        }
    });

    return result;
};


export const createFoodArrayWithQnt2 = (arrFoods: Food[], arrQtde: foodsInfoNutriDay[]): FoodInfoNutriDay[] => {

    const result: FoodInfoNutriDay[] = [];

    arrFoods.forEach((food) => {
        const foodFound = arrQtde.find((item) => item.food_id === food.id);

        if (foodFound) {
            const foodWithQnt: FoodInfoNutriDay = { ...food, qtde: foodFound.qtde };
            result.push(foodWithQnt);
        } else {
            // Se não encontrar, adiciona o alimento com quantidade 1
            const foodWithQnt: FoodInfoNutriDay = { ...food, qtde: 1 };
            result.push(foodWithQnt);
        }
    });

    return result;
};

export const createMealArrayWithQnt2 = (arrFoods: Meal[], arrQtde: mealsInfoNutriDay[]): MealInfoNutriDay[] => {

    const result: MealInfoNutriDay[] = [];

    arrFoods.forEach((meal) => {
        const mealFound = arrQtde.find((item) => item.meal_id === meal.id);

        if (mealFound) {
            const mealWithQnt: MealInfoNutriDay = { ...meal, qtde: mealFound.qtde };
            result.push(mealWithQnt);
        } else {
            // Se não encontrar, adiciona o alimento com quantidade 1
            const mealWithQnt: MealInfoNutriDay = { ...meal, qtde: 1 };
            result.push(mealWithQnt);
        }
    });

    return result;
};