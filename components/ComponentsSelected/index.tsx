import { Food } from '@/types/Food';
import { Meal } from '@/types/Meal';
import { useEffect } from 'react';
import { Icon } from '../Icon';
import styles from './styles.module.css';
import { foodsInfoNutriDay, mealsInfoNutriDay } from '@/types/foodsInfoNutriDay';

type Props = {
    foods: (Food | Meal)[];
    selectedFoods: Food[];
    selectedMeals: Meal[];
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

export const ComponentsSelected = ({ foods, selectedFoods, selectedMeals, onHandle, disabled, selectedFoodsOfInfoDay, selectedMealsOfInfoDay }: Props) => {


    // Criar um array de itens únicos
    const uniqueItemsMeal: uniqueItemsFoodOrMeal[] = Array.from(new Set(selectedMeals.map(item =>
    ({
        id: item.id,
        name: item.name,
        isMeal: true,
        qtde: selectedMealsOfInfoDay?.filter((meal) => item.id === meal.meal_id)[0]?.qtde || 0

    }))));

    const uniqueItemsFood: uniqueItemsFoodOrMeal[] = Array.from(new Set(selectedFoods.map(item =>
    ({
        id: item.id, //colocar o id do food
        name: item.name,
        isMeal: false,
        qtde: selectedFoodsOfInfoDay?.filter((food) => item.id === food.food_id)[0]?.qtde || 0

    }))));

    let uniqueItems: uniqueItemsFoodOrMeal[] = uniqueItemsFood.concat(uniqueItemsMeal)


    //fazer array de acordo com os ids de unique items.



    //if selectedFoodsOfInfoDay exists and if have id, put quantity equal of selectedFoodsOfInfoDay

    const onHandleMinusFunction = (selectedIndex: number, isMeal: boolean) => {
        console.log(selectedIndex)
        onHandle(selectedIndex, isMeal);
    }

    useEffect(() => {
    }, [foods])

    useEffect(() => {
        /*  console.log("[ComponentsSelected] SELECTED FOODS", selectedFoods)
         console.log("[ComponentsSelected] SELECTED MEALS", selectedMeals)
         console.log("[ComponentsSelected] SELECTED FOODS OF INFODAY", selectedFoodsOfInfoDay)
         console.log("[ComponentsSelected] SELECTED MEALS OF INFODAY", selectedMealsOfInfoDay)
         console.log("[ComponentsSelected] UNIQUE ITEMS MEAL:", uniqueItemsMeal);
         console.log("[ComponentsSelected] UNIQUE ITEMS FOOD:", uniqueItemsFood);
         console.log("[ComponentsSelected] UNIQUE ITEMS MIXED:", uniqueItems);
         console.log("[ComponentsSelected] FOODS:", foods); */
    }, [])


    return (
        <div className={styles.container}
            style={{
                pointerEvents: !disabled ? 'none' : 'all',
                opacity: !disabled ? '0.4' : 'initial'
            }}>
            {uniqueItemsFood.length > 0 && uniqueItemsFood.map((item, index) =>
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
            {uniqueItemsMeal.length > 0 && uniqueItemsMeal.map((item, index) =>
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