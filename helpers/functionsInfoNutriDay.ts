import { Food, FoodInfoNutriDay } from "@/types/Food";
import { Meal, MealInfoNutriDay } from "@/types/Meal";
import { foodsInfoNutriDay, mealsInfoNutriDay } from "@/types/foodsInfoNutriDay";




//ESSA FUNCAO TRAZ RETORNA OS FOODS COMBINADOS DE ACORDO COM A QUANTIDADE NO CARRINHO
//É FEITO A BUSCA DO INFONUTRIDAY, EM INFONUTRIDAY PEGAMOS TODAS REFEICOES DESSE INFONUTRIDAY COM A QUANTIDADE
//DEPOIS DE PEGAR A QUANTIDADE, GERAMOS UM NOVO ARRAY DE FOODS COM BASE NA QUANTIDADE REPETINDO OS ELEMENTOS, PARA COMBINED FOODS.


export const getAllFoodsAndPutInACombinedArray = (allFoodsInfoNutriDay: foodsInfoNutriDay[], selectedFoods: Food[]) => {

    let selectedFoodsForCombinedFoods: Food[] = [];

    allFoodsInfoNutriDay.forEach((item) => {
        const foodToAdd = selectedFoods.find((food: Food) => food.id === item.food_id)
        if (foodToAdd) {
            for (let i = 0; i < item.qtde; i++) {
                selectedFoodsForCombinedFoods.push(foodToAdd);
            }
        }
    })

    return selectedFoodsForCombinedFoods

}

export const getAllMealsAndPutInACombinedArray = (allMealsInfoNutriDay: mealsInfoNutriDay[], selectedMeals: Meal[]) => {

    let selectedMealsForCombinedMeals: Meal[] = [];

    allMealsInfoNutriDay.forEach((item) => {
        const mealToAdd = selectedMeals.find((meal: Meal) => meal.id === item.meal_id)
        if (mealToAdd) {
            for (let i = 0; i < item.qtde; i++) {
                selectedMealsForCombinedMeals.push(mealToAdd);
            }
        }
    })

    return selectedMealsForCombinedMeals

}

export const selectedFoodsForCombinedFoodsMinusFunction = (selectedFoodsCounted: FoodInfoNutriDay[]) => {

    let selectedFoods: Food[] = [];


    console.log("selectedFoodsCounted", selectedFoodsCounted)

    
    selectedFoodsCounted.forEach((item) => {

        for (let i = 0; i < item.qtde; i++) {
            selectedFoods.push({
                id: item.id,
                name: item.name,
                portion: item.portion,
                protein: item.protein,
                calories: item.calories,
                grease: item.grease,
                salt: item.salt,
                image: item.image
            })
        }

    })

    return selectedFoods;

}

export const selectedMealsForCombinedFoodsMinusFunction = (selectedMealsCounted: MealInfoNutriDay[]) => {

    let selectedMeals: Meal[] = [];

    selectedMealsCounted.forEach((item) => {

        for (let i = 0; i < item.qtde; i++) {
            selectedMeals.push({
                id: item.id,
                name: item.name,
                portion: item.portion,
                protein: item.protein,
                calories: item.calories,
                grease: item.grease,
                salt: item.salt,
                isMeal: item.isMeal,
                foods: item.foods,
                image: item.image
            })
        }

    })

    return selectedMeals;

}



