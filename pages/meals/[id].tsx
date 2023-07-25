import { FoodComponent2 } from '@/components/FoodComponent2';
import { Header } from '@/components/Header';
import { ButtonMain } from '@/components/ButtonMain';
import { useApi } from '@/libs/useApi';
import { Food } from '@/types/Food';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styles from '../../styles/Meal-id.module.css';
import { useState } from 'react';
import { ModalExclude } from '@/components/ModalExclude';
import { Meal } from '@/types/Meal';
import { InputMain } from '@/components/InputMain';
import SelectFood2 from '@/components/SelectFood2';
import { FoodComponent } from '@/components/FoodComponent';
import { Icon } from '@/components/Icon';


const MealId = (data: ServerProps) => {

    const router = useRouter();
    const api = useApi();

    const [meal, setMeals] = useState(data.meal);
    const [foods, setFoods] = useState(data.foods);



    return (
        <>
            <Header title={data.meal.name} leftIcon='back' onClickLeftIcon={() => router.push('/meals')} />
            <div className={styles.container}>

                <div className={styles.editButton}>
                    <ButtonMain onClick={() => { }} textButton={"Editar"} fill={false} />
                </div>

                <div className={styles.addFoodEditArea}>
                    <SelectFood2 foods={foods} textLabel={"Alimento"} />
                </div>

                <div className={styles.nameMeal}>{data.meal.name}</div>

                <div className={styles.containerFoods}>
                    <div className={styles.item}>
                        {meal.foods.map((item, index) => (
                            <FoodComponent data={item} url='foods' key={index} minusButton={true} />
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default MealId;

type ServerProps = {
    meal: Meal;
    foods: Food[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    // Extrair o ID da URL usando o objeto context
    const { id } = context.query;

    const api = useApi();

    //Get meal
    const meal = await api.getOneMeal(parseInt(id as string));
    const foods = await api.getFoods();


    return {
        props: {
            meal,
            foods
        }
    }
}