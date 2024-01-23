import { Food, FoodInfoNutriDay } from '@/types/Food';
import { Meal, MealInfoNutriDay } from '@/types/Meal';
import { useEffect } from 'react';
import { Icon } from '../Icon';
import styles from './styles.module.css';
import { foodsInfoNutriDay, mealsInfoNutriDay } from '@/types/foodsInfoNutriDay';

type Props = {
    foods: (Food | Meal)[];
    selectedFoods: Food[];
    selectedMeals: Meal[];
    selectedFoodsWithCount: FoodInfoNutriDay[]
    selectedMealsWithCount: MealInfoNutriDay[]
    onHandle: (selectedIndex: number, isMeal: boolean) => void;
    disabled: boolean;
    selectedFoodsOfInfoDay: foodsInfoNutriDay[] | null;
    selectedMealsOfInfoDay: mealsInfoNutriDay[] | null;
}

type uniqueItemsFoodOrMeal = {
    id: number;
    name: string;
    qtde: number;
    isMeal: boolean
}

export const ComponentsSelected = ({ foods, selectedFoods, selectedMeals, onHandle,
    disabled, selectedFoodsOfInfoDay, selectedMealsOfInfoDay, selectedFoodsWithCount, selectedMealsWithCount }: Props) => {



    // Criar um array de itens únicos
    const uniqueItemsMeal: uniqueItemsFoodOrMeal[] = Array.from(new Set(selectedMealsWithCount.map(item =>
    ({
        id: item.id,
        name: item.name,
        isMeal: true,
        qtde: selectedMealsOfInfoDay?.filter((meal) => item.id === meal.meal_id)[0]?.qtde || 0

    }))));

    const uniqueItemsFood: uniqueItemsFoodOrMeal[] = Array.from(new Set(selectedFoodsWithCount.map(item =>
    ({
        id: item.id, //colocar o id do food
        name: item.name,
        isMeal: false,
        qtde: selectedFoodsOfInfoDay?.filter((food) => item.id === food.food_id)[0]?.qtde || 0

    }))));

    const onHandleMinusFunction = (selectedIndex: number, isMeal: boolean) => {
        console.log(selectedIndex)
        onHandle(selectedIndex, isMeal);
    }

    useEffect(() => {
    }, [foods])

    useEffect(() => {
        console.log("[ComponentsSelected] SELECTED FOODS", selectedFoods)
        console.log("[ComponentsSelected] SELECTED MEALS", selectedMeals)
        console.log("[ComponentsSelected] uniqueItemsFood", uniqueItemsFood)
        console.log("[ComponentsSelected] uniqueItemsMeal", uniqueItemsMeal)
    }, [selectedFoods, selectedMeals])


    return (
        <div className={styles.container}
            style={{
                pointerEvents: !disabled ? 'none' : 'all',
                opacity: !disabled ? '0.4' : 'initial'
            }}>
            {selectedFoodsWithCount.length > 0 && selectedFoodsWithCount.map((item, index) =>
                <div className={styles.item} key={index}>
                    <div className={styles.itemName}>
                        {item.name}
                    </div>
                    <div className={styles.minusIcon} onClick={() => onHandleMinusFunction(index, false)}>
                        <div className={styles.qtMinusIcon}> {item.qtde}x </div>
                        <Icon svg='minus2' width={24} height={24} />
                    </div>
                </div>
            )}
            {selectedMealsWithCount.length > 0 && selectedMealsWithCount.map((item, index) =>
                <div className={styles.item} key={index}>
                    <div className={styles.itemName}>
                        {item.name}
                    </div>
                    <div className={styles.minusIcon} onClick={() => onHandleMinusFunction(index, item.isMeal)}>
                        <div className={styles.qtMinusIcon}> {item.qtde}x </div>
                        <Icon svg='minus2' width={24} height={24} />
                    </div>
                </div>
            )}
        </div>
    )
}