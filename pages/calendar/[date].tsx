import { Header } from '@/components/Header';
import dynamic from 'next/dynamic';
import { Sidebar } from '@/components/Sidebar';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import styles from '../../styles/Date.module.css'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { GetServerSideProps } from 'next';
import { useApi } from '@/libs/useApi';
import { parse } from 'date-fns';
import { replaceDashWithSlash } from '../../helpers/Formatters';
import SelectFood2 from '@/components/SelectFood2';
import { Food } from '@/types/Food';
import { Meal } from '@/types/Meal';
import { ButtonMain } from '../../components/ButtonMain';
import { ComponentsSelected } from '@/components/ComponentsSelected';
import { InfoDayNutritional } from '@/components/InfoDayNutritional';
import { sumProperty } from '@/helpers/sumProperty';
import { InfoNutritionalDay } from '../../types/InfoNutritionalDay';


const DatePage = (data: ServerProps) => {

    const router = useRouter();
    const api = useApi();

    const [menuOpened, setMenuOpened] = useState(false);

    //handling the Date to use later
    const selectedDateString = replaceDashWithSlash(data.date);
    const formatString = 'dd/MMM/yyyy';
    const parsedDate = parse(selectedDateString, formatString, new Date());

    //select
    const [foods, setFoods] = useState<Food[]>(data.foods);
    const [meals, setMeals] = useState<Meal[]>(data.meals);
    const [showSelectFoods, setShowSelectFoods] = useState(true);
    const [showSelectMeals, setShowSelectMeals] = useState(false);

    const [selectedFoodId, setSelectedFoodID] = useState<number>(0);
    const [selectedMealId, setSelectedMealID] = useState<number>(0);
    const [selectedCombinedFoodID, setSelectedCombinedFoodID] = useState<number>(0);

    const [combinedFoodsAndMeals, setCombinedFoodsAndMeals] = useState<Meal[] | Food[]>([]);

    //InfoDay
    const [infoNutriDay, setInfoNutriDay] = useState<InfoNutritionalDay>({ calories: 0, grease: 0, portion: 0, protein: 0, salt: 0 });

    useEffect(() => {
        handleUpdateInfoNutritionalDay();
    }, [combinedFoodsAndMeals])

    const handleSelectedFood = (selectedFoodId: number) => {

        setSelectedFoodID(selectedFoodId);
        console.log("ID selecionado: ", selectedFoodId);
    }

    const handleSelectedMeal = (selectedMealId: number) => {

        setSelectedMealID(selectedMealId);
        console.log("ID selecionado: ", selectedMealId);
    }

    const handleSelectedCombinedFood = (selectedCombinedFoodIndex: number) => {

        //remover food de selectedCombinedFoodID que contenha o indice selectedCombinedFoodIndex
        //fazendo um novo array onde tiramos os que possuem o indice indicado na funcao
        setCombinedFoodsAndMeals((prevFoodsAndMeals) => {
            return prevFoodsAndMeals.filter((item, index) => index !== selectedCombinedFoodIndex);
        });

    }

    const onPlusButtonAddFood = async () => {
        const foodSelected = await api.getOneFood(selectedFoodId);
        if (foodSelected) {
            setCombinedFoodsAndMeals([...combinedFoodsAndMeals, foodSelected]);
        }

    }

    const onPlusButtonAddMeal = async () => {
        const mealSelected = await api.getOneMeal(selectedMealId);
        if (mealSelected) {
            setCombinedFoodsAndMeals([...combinedFoodsAndMeals, mealSelected]);
        }
    }

    const handleFoodButton = () => {
        setShowSelectFoods(true);
        setShowSelectMeals(false);
    }

    const handleMealButton = () => {
        setShowSelectMeals(true);
        setShowSelectFoods(false);
    }

    //InfoItem
    const handleUpdateInfoNutritionalDay = () => {
        // Atualiza o estado do alimento com os novos dados vindo do componente filho.

        if (combinedFoodsAndMeals.length > 0) {
            let info: InfoNutritionalDay = {
                portion: sumProperty(combinedFoodsAndMeals, 'portion'),
                protein: sumProperty(combinedFoodsAndMeals, 'protein'),
                calories: sumProperty(combinedFoodsAndMeals, 'calories'),
                grease: sumProperty(combinedFoodsAndMeals, 'grease'),
                salt: sumProperty(combinedFoodsAndMeals, 'salt'),
            }

            setInfoNutriDay(info);
        }
    }

    return (
        <>
            <Head>
                <title>Calendario | BSNutri</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header leftIcon='back' title={data.date} rightIcon='menu' onClickLeftIcon={() => router.push('/calendar')} onClickRightIcon={() => setMenuOpened(!menuOpened)} />
            <Sidebar menuOpened={menuOpened} onClose={() => setMenuOpened(false)} />
            <div className={styles.container}>
                <div className={styles.topButtonArea}>
                    <ButtonMain textButton='Alimento' fill={showSelectFoods ? true : false} onClick={handleFoodButton} disabled={true} />
                    <ButtonMain textButton='Plato' fill={showSelectMeals ? true : false} onClick={handleMealButton} disabled={true} />
                </div>
                {showSelectFoods &&
                    <SelectFood2 foods={foods} textLabel={"Seleccione un alimento"} handleSelectedFood={handleSelectedFood} onPlus={onPlusButtonAddFood} disabled={true} />
                }
                {showSelectMeals &&
                    <SelectFood2 foods={meals} textLabel={"Seleccione un plato preparado"} handleSelectedFood={handleSelectedMeal} onPlus={onPlusButtonAddMeal} disabled={true} />
                }
                {combinedFoodsAndMeals.length > 0 &&
                    <>
                        <ComponentsSelected foods={combinedFoodsAndMeals} onHandle={handleSelectedCombinedFood} />
                        <InfoDayNutritional
                            portionValue={infoNutriDay.portion}
                            proteinValue={infoNutriDay.protein}
                            caloriesValue={infoNutriDay.calories}
                            greaseValue={infoNutriDay.grease}
                            saltValue={infoNutriDay.salt}
                        />
                    </>
                }
            </div>

        </>
    )
}


export default DatePage;

type ServerProps = {
    date: string; // Defina o tipo da prop "date" como string
    foods: Food[];
    meals: Meal[];
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    // Extrair o ID da URL usando o objeto context
    const { date } = context.query;

    const api = useApi();
    const foods = await api.getFoods();
    const meals = await api.getMeals();


    return {
        props: {
            date: date as string,
            foods,
            meals
        }
    }
}


//const [combinedFoodsAndMeals, setCombinedFoodsAndMeals] = useState<Meal[] | Food[]>([...data.foods, ...data.meals]);