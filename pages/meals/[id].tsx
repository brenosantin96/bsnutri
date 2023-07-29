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
import { sumProperty } from '@/helpers/sumProperty';


const MealId = (data: ServerProps) => {

    const router = useRouter();
    const api = useApi();

    const [meal, setMeal] = useState(data.meal);
    const [foods, setFoods] = useState(data.foods);
    const [selectedFoodId, setSelectedFoodID] = useState(0);

    //booleans
    const [disabled, setDisabled] = useState(false);

    //modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const removeMeal = () => {
        setIsModalOpen(true);
    }

    const handleDeleteMeal = async (id: number) => {
        let deleted = await api.deleteMeal(id);
 
        if(deleted){
         console.log("deletado com sucesso o Meal: ", id)
         //router.push('/foods');
        }
 
     }


    const handleEditButton = () => {
        setDisabled(true);
    }

    const handleDeleteButton = () => {
        setDisabled(true);
    }

    const handleSelectedFood = (selectedFoodId: number) => {
        setSelectedFoodID(selectedFoodId)
    }

    const onPlusButtonAddFood = async () => {
        let foodSelected = await api.getOneFood(selectedFoodId);

        if (foodSelected) {
            // Crie uma cópia do estado 'meal' usando o spread operator
            const updatedMeal = { ...meal };

            // Adicione o 'foodSelected' à nova cópia do estado 'meal'
            updatedMeal.foods = [...updatedMeal.foods, foodSelected];

            // Atualize o estado 'meal' com a nova cópia contendo o 'foodSelected'
            setMeal(updatedMeal);
        }

    }

    const onMinusButtonRemoveFood = (idFood: number) => {
        //remover o food que possui este id
        const updatedMeal = { ...meal };

        //encontrar o primeiro elemento que possua o ID, e remover esse elemento do array

        const foundFoodIndex = updatedMeal.foods.findIndex((food) => food.id === idFood);

        if (foundFoodIndex !== -1) {
            updatedMeal.foods.splice(foundFoodIndex, 1);
            setMeal(updatedMeal);
        }

    }


    const handleUpdateMeal = (updatedMeal: Meal) => {
        // Atualiza o estado do alimento com os novos dados vindo do componente filho.

        const foodsSelected = updatedMeal.foods;

        if (foodsSelected.length === 0) {
            alert("Selecione pelo menos 1 alimento");
            return;
        }

        if (foodsSelected) {
            let meal: Meal = {
                id: updatedMeal.id,
                isMeal: true,
                name: updatedMeal.name,
                portion: sumProperty(foodsSelected, 'portion'),
                protein: sumProperty(foodsSelected, 'protein'),
                calories: sumProperty(foodsSelected, 'calories'),
                grease: sumProperty(foodsSelected, 'grease'),
                salt: sumProperty(foodsSelected, 'salt'),
                foods: foodsSelected
            }

            setMeal(meal);
            console.log(meal);
        }
    }



    return (
        <>
            <Header title={data.meal.name} leftIcon='back' onClickLeftIcon={() => router.push('/meals')} />
            <div className={styles.container}>

                <div className={styles.editButton}>
                    <ButtonMain onClick={handleEditButton} textButton={"Editar"} fill={false} disabled={true} />
                    <ButtonMain onClick={removeMeal} textButton={"Remover"} fill={true} disabled={disabled} />
                </div>

                {isModalOpen &&
                    <div>
                        <ModalExclude id={meal.id} valueToRemove={meal.name} menuOpened={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)} onDelete={handleDeleteMeal}  />
                        <div className={styles.backdrop} />
                    </div>
                }

                <div className={styles.addFoodEditArea}>
                    <SelectFood2
                        foods={foods}
                        textLabel={"Alimento"}
                        disabled={disabled}
                        handleSelectedFood={handleSelectedFood}
                        onPlus={onPlusButtonAddFood}
                    />
                </div>

                <div className={styles.nameMeal}>{data.meal.name}</div>

                <div className={styles.containerFoods}>
                    <div className={styles.item}>
                        {meal.foods.map((item, index) => (
                            <FoodComponent data={item} url='foods' key={index} minusButton={true} link={false} disabled={disabled} onMinusHandle={onMinusButtonRemoveFood} />
                        ))}
                    </div>
                </div>

                <div className={styles.bottomArea}>
                    <ButtonMain onClick={() => { router.push('/meals') }} textButton={"Volver"} fill={false} disabled={true} />
                    <ButtonMain onClick={() => handleUpdateMeal(meal)} textButton={"Guardar"} fill={true} disabled={disabled} />
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