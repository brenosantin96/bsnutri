import { FoodComponent2 } from '@/components/FoodComponent2';
import { Header } from '@/components/Header';
import { ButtonMain } from '@/components/ButtonMain';
import { useApi } from '@/libs/useApi';
import { Food } from '@/types/Food';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styles from '../../styles/Meal-id.module.css';
import { useEffect, useState } from 'react';
import { ModalExclude } from '@/components/ModalExclude';
import { Meal, MealWithOnlyId } from '@/types/Meal';
import { InputMain } from '@/components/InputMain';
import SelectFood2 from '@/components/SelectFood2';
import { FoodComponent } from '@/components/FoodComponent';
import { Icon } from '@/components/Icon';
import { sumProperty } from '@/helpers/sumProperty';
import { useApi2 } from '@/libs/useapi2';


const MealId = (data: ServerProps) => {

    const router = useRouter();
    const api = useApi();

    const [meal, setMeal] = useState<MealWithOnlyId>(data.meal);

    const [foods, setFoods] = useState(data.foods);

    const [availableFoods, setAvailableFoods] = useState<Food[]>(foods.filter(food => !meal.meals_has_foods || !meal.meals_has_foods.some(mealFood => mealFood.foods_id === food.id)));
    /*  !meal.foods.some(...) nega o resultado do some, ou seja, verifica se o alimento atual NÃO está presente em meal.foods.
 Portanto, o filter incluirá o alimento atual em availableFoods somente se ele NÃO estiver em meal.foods. */

    //enable buttons
    const [isClickable, setIsClickable] = useState(true);
    const [quantityTimesCanClickPlusButton, setQuantityTimesCanClickPlusButton] = useState<number>(data.foods.length > 0 ? data.foods.length : 0)


    const [selectedFoodId, setSelectedFoodID] = useState(0);

    //booleans
    const [disabled, setDisabled] = useState(true);
    const [disableSelect, setDisableSelect] = useState(true)
    const [isEdditing, setIsEdditing] = useState(false);

    //modal
    const [isModalOpen, setIsModalOpen] = useState(false);



    useEffect(() => {

        console.log("MEAL FOODS ID", meal)

        // Filtrar os alimentos disponíveis sempre que o estado meal for alterado
        console.log("availableFoods FOODS", availableFoods)
        const updatedAvailableFoods = foods.filter(food => !meal.meals_has_foods || !meal.meals_has_foods.some(mealFood => mealFood.foods_id === food.id));
        console.log("updatedAvailableFoods FOODS", availableFoods)
        setAvailableFoods(updatedAvailableFoods);


        //CORRIGIR ESSA LINHA, VAI DAR BUG SE NAO TIVER ALIMENTOS
        if (updatedAvailableFoods.length > 0) {
            setSelectedFoodID(updatedAvailableFoods[0].id);
        }
        console.log(updatedAvailableFoods)
    }, [meal])



    useEffect(() => {
        if (foods) {
            if (isEdditing) { //se estiver editando, select vai estar LIBERADO!
                setDisableSelect(false)
            }
            if (isEdditing && availableFoods.length === 0) { //se estiver editando e foods disponiveis chegar a true, select vai estar DESABILITADO
                setDisableSelect(true)
            }
            

        }
    }, [availableFoods, isEdditing])



    const removeMeal = () => {
        setIsModalOpen(true);
    }

    const handleDeleteMeal = async (id: number) => {
        let deleted = await api.deleteMeal(id);

        if (deleted.msg) {
            console.log("deletado com sucesso o Meal: ", id)
            console.log(deleted)
            router.push('/meals');
        }

    }


    const handleEditButton = () => {
        setDisabled(false);
        setIsEdditing(true);
    }

    const handleDeleteButton = () => {
        setDisabled(true);
    }

    const handleSelectedFood = (selectedFoodId: number) => {
        setSelectedFoodID(selectedFoodId)
        return 'food';
    }

    const onPlusButtonAddFood = async () => {

        let foodSelected = await api.getOneFood(selectedFoodId);

        if (isClickable) {
            if (foodSelected) {
                // Crie uma cópia do estado 'meal' usando o spread operator
                const updatedMeal = { ...meal };

                // Adicione o 'foodSelected' à nova cópia do estado 'meal'
                updatedMeal.meals_has_foods = [...updatedMeal.meals_has_foods, { foods_id: foodSelected.id, meals_id: meal.id, foods: foodSelected }];

                // Atualize o estado 'meal' com a nova cópia contendo o 'foodSelected'
                setMeal(updatedMeal);
            }
        }


    }

    const onMinusButtonRemoveFood = (idFood: number) => {
        //remover o food que possui este id
        const updatedMeal = { ...meal };

        //encontrar o primeiro elemento que possua o ID, e remover esse elemento do array

        const foundFoodIndex = updatedMeal.meals_has_foods.findIndex((food) => food.foods_id === idFood);

        if (foundFoodIndex !== -1) {
            updatedMeal.meals_has_foods.splice(foundFoodIndex, 1);
            setMeal(updatedMeal);
        }

    }


    const handleUpdateMeal = async (updatedMeal: MealWithOnlyId) => {
        // Atualiza o estado do alimento com os novos dados vindo do componente filho.

        const mealsHasFoods = updatedMeal.meals_has_foods;

        // Extrai apenas os números da propriedade foods_id
        const foodsSelected = mealsHasFoods.map((mealFood) => mealFood.foods_id);

        console.log("IDS SELECIONADOS", foodsSelected);

        let foodsComplete: Food[] = await api.getFoods();
        let selectedFoods = foodsComplete.filter(food => foodsSelected.includes(food.id));

        console.log("SELECTED FOODS", selectedFoods)

        //TENHO QUE FAZER UMA FUNCAO QUE VAI ME RETORNAR UM ARRAY COM TODOS FOODS SELECIONADOS!

        // Flatten o array, pois map cria um array de arrays
        const flattenedFoodsSelected = foodsSelected.flat();


        if (flattenedFoodsSelected.length === 0) {
            alert("Selecione pelo menos 1 alimento");
            return;
        }

        if (foodsSelected) {
            let meal: MealWithOnlyId = {
                id: updatedMeal.id,
                isMeal: true,
                name: updatedMeal.name,
                portion: sumProperty(selectedFoods, 'portion'),
                protein: sumProperty(selectedFoods, 'protein'),
                calories: sumProperty(selectedFoods, 'calories'),
                grease: sumProperty(selectedFoods, 'grease'),
                salt: sumProperty(selectedFoods, 'salt'),
                meals_has_foods: mealsHasFoods
            }

            setMeal(meal);
            let responseUpdateMeal = await api.saveEditedMeal(meal.id, meal.name, meal.portion, meal.protein, meal.calories, meal.grease, meal.salt, foodsSelected)
            setIsEdditing(false);
            console.log(responseUpdateMeal);
            console.log(meal);
        }
    }



    return (
        <>
            <Header title={data.meal.name} leftIcon='back' onClickLeftIcon={() => router.push('/meals')} />
            <div className={styles.container}>

                <div className={styles.editButton}>
                    <ButtonMain onClick={handleEditButton} textButton={"Editar"} fill={false} disabled={false} />
                    <ButtonMain onClick={removeMeal} textButton={"Remover"} fill={true} disabled={disabled} />
                </div>

                {isModalOpen &&
                    <div>
                        <ModalExclude id={meal.id} valueToRemove={meal.name} menuOpened={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)} onDelete={handleDeleteMeal} />
                        <div className={styles.backdrop} />
                    </div>
                }

                <div className={styles.addFoodEditArea}>
                    <SelectFood2
                        foods={availableFoods}
                        textLabel={"Alimento"}
                        disableSelect={disableSelect}
                        handleSelectedFood={handleSelectedFood}
                        onPlus={onPlusButtonAddFood}
                    />
                </div>

                <div className={styles.nameMeal}>{data.meal.name}</div>

                <div className={styles.containerFoods}>
                    <div className={styles.item}>
                        {meal.meals_has_foods && meal.meals_has_foods.map((item, index) => (
                            <FoodComponent data={item.foods} url='foods' key={index} minusButton={true} link={false} disabled={disabled} onMinusHandle={onMinusButtonRemoveFood} />
                        ))}
                    </div>
                </div>

                <div className={styles.bottomArea}>
                    <ButtonMain onClick={() => { router.push('/meals') }} textButton={"Volver"} fill={false} disabled={disabled} />
                    <ButtonMain onClick={() => handleUpdateMeal(meal)} textButton={"Guardar"} fill={true} disabled={disabled} />
                </div>

            </div>
        </>
    )
}

export default MealId;

type ServerProps = {
    meal: MealWithOnlyId;
    foods: Food[];
    token: any;
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    // Extrair o ID da URL usando o objeto context
    const { id } = context.query;


    const token = context.req.headers.cookie?.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1] || '';
    const api2 = useApi2(token);

    //Get meal
    const meal = await api2.getOneMeal(parseInt(id as string));
    const foods = await api2.getFoods();

    console.log("MEAL ", meal);
    console.log("FOODS", foods);



    return {
        props: {
            token,
            meal,
            foods
        }
    }
}