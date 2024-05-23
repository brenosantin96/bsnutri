
import { Header } from '@/components/Header';
import Head from 'next/head'
import { useRouter } from 'next/router';
import styles from '../../styles/RegisterMeal.module.css'
import { GetServerSideProps } from 'next';
import { useApi } from '@/libs/useApi';
import { InputMain } from '../../components/InputMain'
import { useEffect, useState } from 'react';
import { ButtonMain } from '@/components/ButtonMain';
import { Food } from '@/types/Food';
import { Meal, MealWithOnlyId, MealWithOnlyId2 } from '@/types/Meal';
import { Icon } from '@/components/Icon';
import { SelectFood } from '@/components/SelectFood';
import { sumProperty } from '../../helpers/sumProperty'
import { InfoItemNutritional } from '@/components/InfoItemNutritional';
import { useApi2 } from '@/libs/useapi2';


const RegisterMealPage = (data: ServerProps) => {


    const router = useRouter();
    const api = useApi2(data.token);



    //inputs
    const [nameInput, setNameInput] = useState("");

    //foods
    const [foods, setFoods] = useState<Food[]>(data.foods ? data.foods : []);
    const [selectedFoodIds, setSelectedFoodIds] = useState<number[]>([]);
    const [quantityTimesCanClickPlusButton, setQuantityTimesCanClickPlusButton] = useState<number>(data.foods.length > 0 ? data.foods.length : 0)

    //enable buttons
    const [isClickable, setIsClickable] = useState(true);

    useEffect(() => {
        console.log("Foods: ", foods)
    }, [foods])

    useEffect(() => {
        console.log("selectedFoodIds: ", selectedFoodIds)
    }, [selectedFoodIds])


    useEffect(() => {

        if (foods) {
            if (selectedFoodIds.length === quantityTimesCanClickPlusButton) {
                console.log("foods: ", foods)
                console.log("selectedFoodIds.length: ", selectedFoodIds.length)
                console.log("foods.length: ", foods.length)
                console.log("isClickable ", isClickable)
                setIsClickable(false)
            } else {
                console.log("foods: ", foods)
                console.log("selectedFoodIds.length: ", selectedFoodIds.length)
                console.log("foods.length: ", foods.length)
                console.log("isClickable ", isClickable)
                setIsClickable(true);
            }
        }

    }, [selectedFoodIds])


    //valueSumedProperties
    //no Onchange assim que selecionado, tenho que pegar o valor e atualizar estas variaveis.
    const [summedPortion, setSummedPortion] = useState(0);
    const [summedProtein, setSummedProtein] = useState(0);
    const [summedCalories, setSummedCalories] = useState(0);
    const [summedGrease, setSummedGrease] = useState(0);
    const [summedSalt, setSummedSalt] = useState(0);




    const handleSummedPortion = (value: number, operation: 'plus' | 'minus') => {
        if (operation === 'plus') {
            setSummedPortion(summedPortion + value);
        } else {
            setSummedPortion(summedPortion - value);
        }
    }

    const handleSummedProtein = (value: number, operation: 'plus' | 'minus') => {
        if (operation === 'plus') {
            setSummedProtein(summedProtein + value);
        } else {
            setSummedProtein(summedProtein - value);
        }
    }

    const handleSummedCalories = (value: number, operation: 'plus' | 'minus') => {
        if (operation === 'plus') {
            setSummedCalories(summedCalories + value);
        } else {
            setSummedCalories(summedCalories - value);
        }
    }

    const handleSummedGrease = (value: number, operation: 'plus' | 'minus') => {
        if (operation === 'plus') {
            setSummedGrease(summedGrease + value);
        } else {
            setSummedGrease(summedGrease - value);
        }
    }

    const handleSummedSalt = (value: number, operation: 'plus' | 'minus') => {
        if (operation === 'plus') {
            setSummedSalt(summedSalt + value);
        } else {
            setSummedSalt(summedSalt - value);
        }
    }



    const addSelectFoodComponent = () => {
        if (isClickable) {
            setSelectedFoodIds([...selectedFoodIds, -1]); // O id -1 é para quando usuario ainda nao selecionou o alimento em concreto
        }
    };



    const handleSelectedItem = (id: number, index: number) => {
        const newSelectedFoodIds = [...selectedFoodIds];
        newSelectedFoodIds[index] = id;
        setSelectedFoodIds(newSelectedFoodIds);

        if (foods) {
            setFoods(foods.filter((food) => food.id !== id));
        }

    }

    const handleDeletedItem = async (id: number, index: number) => {
        const newSelectedFoodIds = selectedFoodIds.filter((_, idx) => idx !== index);
        setSelectedFoodIds(newSelectedFoodIds);

        const food = await api.getOneFood(id);

        if (food) {
            if (foods) {
                setFoods([...foods, food]);
            }
        }
    };


    const handleSaveMeal = async () => {
        const foodsSelected = await api.getManyFood(selectedFoodIds);

        if (foodsSelected.length === 0) {
            console.log("Selecione pelo menos 1 alimento");
            return;
        }

        if (foodsSelected) {
            let meal: MealWithOnlyId2 = {
                id: 1,
                isMeal: true,
                name: nameInput,
                portion: sumProperty(foodsSelected, 'portion'),
                protein: sumProperty(foodsSelected, 'protein'),
                calories: sumProperty(foodsSelected, 'calories'),
                grease: sumProperty(foodsSelected, 'grease'),
                salt: sumProperty(foodsSelected, 'salt'),
                foods_id: selectedFoodIds
            }

            console.log(meal);
            let save = await api.createMeal(meal.name, meal.portion, meal.protein, meal.calories, meal.grease, meal.salt, meal.foods_id);
            console.log(save);
            router.push('/meals')


            //consertar essa chamada, esta quebrando o servidor!

        }

    }




    return (
        <>
            <Head>
                <title>Platos | BSNutri</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header leftIcon='back' title='Nuevo Plato' onClickLeftIcon={() => router.push('/meals')} />

            <div className={styles.container}>
                <div className={styles.formRegisterArea}>
                    <div className={styles.nameArea}>
                        <div className={styles.inputArea}>
                            <InputMain typeInput='text'
                                name='name'
                                fontSizeLabel={12}
                                textLabel="Nombre"
                                onChange={(e) => (setNameInput(e))}

                            />
                        </div>
                        <div className={styles.iconArea} style={{ pointerEvents: isClickable ? 'auto' : 'none', opacity: isClickable ? 1 : 0.5, }}
                            onClick={addSelectFoodComponent} >
                            <Icon svg='plus' height={27} width={27} />
                        </div>
                    </div>
                    {foods &&
                        <div className={styles.foodsArea}>
                            {selectedFoodIds.map(
                                (id, index) => <SelectFood
                                    key={index}
                                    foods={foods}
                                    index={index}
                                    onChange={(id) => handleSelectedItem(id, index)}
                                    onClick={() => { console.log("Nada") }}
                                    deleteSelectedItem={(id) => handleDeletedItem(id, index)}
                                    selectedFoodsId={selectedFoodIds}
                                    handleSummedPortion={handleSummedPortion}
                                    handleSummedProtein={handleSummedProtein}
                                    handleSummedCalories={handleSummedCalories}
                                    handleSummedGrease={handleSummedGrease}
                                    handleSummedSalt={handleSummedSalt}
                                />
                            )}
                        </div>
                    }
                </div>

                <div className={styles.buttonsRegisterArea}>
                    <ButtonMain onClick={() => router.push('/meals')} textButton={"Volver"} fill={false} disabled={false} />
                    <ButtonMain onClick={handleSaveMeal} textButton={"Guardar"} fill={true} disabled={false} />
                </div>

                <div className={styles.infoItemNutritional}>
                    <InfoItemNutritional
                        foodName={nameInput}
                        portionValue={summedPortion}
                        proteinValue={summedProtein}
                        caloriesValue={summedCalories}
                        greaseValue={summedGrease}
                        saltValue={summedSalt}

                    />
                </div>
            </div>

        </>
    )
}


export default RegisterMealPage;


type ServerProps = {

    foods: Food[];
    token: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    // Extrair o ID da URL usando o objeto context

    const token = context.req.headers.cookie?.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1] || '';
    const api = useApi2(token);

    const allFoods = await api.getFoods();


    return {
        props: {
            foods: allFoods,
            token
        }
    }
}

