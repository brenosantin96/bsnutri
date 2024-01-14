import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import styles from '../../styles/Date.module.css'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { GetServerSideProps } from 'next';
import { getCookie, setCookie } from 'cookies-next';
import { parse } from 'date-fns';
import { es } from 'date-fns/locale';
import { replaceDashWithSlash } from '../../helpers/Formatters';
import SelectFood2 from '@/components/SelectFood2';
import { Food } from '@/types/Food';
import { Meal } from '@/types/Meal';
import { ButtonMain } from '../../components/ButtonMain';
import { ComponentsSelected } from '@/components/ComponentsSelected';
import { InfoDayNutritional } from '@/components/InfoDayNutritional';
import { sumProperty } from '@/helpers/sumProperty';
import { InfoNutritionalDay } from '../../types/InfoNutritionalDay';
import { extractIds, removeDuplicatesFromArray } from '../../helpers/getIds';
import { useApi2 } from '@/libs/useapi2';

const DatePage = (data: ServerProps) => {

    const router = useRouter();
    const api = useApi2(data.token);

    useEffect(() => {
        console.log("DATA INFO DAY", data.infoDay)
    }, [])

    const [menuOpened, setMenuOpened] = useState(false);

    //handling the Date to use later
    //const selectedDateString = "20/aug/2023"
    const txtID = data.id.split("+");
    const selectedDateString = txtID[0];
    const selectedDateStringFormatted = replaceDashWithSlash(selectedDateString);
    const formatString = 'dd/MMM/yyyy';
    const parsedDate = parse(selectedDateStringFormatted, formatString, new Date(), { locale: es });
    const [dateSelected, setDateSelected] = useState<Date>(parsedDate);

    //InfoDay
    const [infoNutriDay, setInfoNutriDay] = useState<InfoNutritionalDay | null>(data.infoDay);

    //check Finalized day
    const [finalizedDay, setFinalizedDay] = useState(false);


    //select
    const [foods, setFoods] = useState<Food[]>(data.foods);
    const [meals, setMeals] = useState<Meal[]>(data.meals);
    const [showSelectFoods, setShowSelectFoods] = useState(true);
    const [showSelectMeals, setShowSelectMeals] = useState(false);

    const [selectedFoodId, setSelectedFoodID] = useState<number>(0);
    const [selectedMealId, setSelectedMealID] = useState<number>(0);

    const [combinedFoodsAndMeals, setCombinedFoodsAndMeals] = useState<Meal[] | Food[]>(infoNutriDay !== null ? infoNutriDay.combinedFoods : []);

    const [selectedMeals, setSelectedMeals] = useState<Meal[]>(infoNutriDay !== null ? infoNutriDay.selectedMeals : []);
    const [selectedFoods, setSelectedFoods] = useState<Food[]>(infoNutriDay !== null ? infoNutriDay.selectedFoods : []);


    useEffect(() => {
        handleUpdateInfoNutritionalDay();
    }, [selectedMeals, selectedFoods, combinedFoodsAndMeals])


    const handleSelectedFood = (selectedFoodId: number) => {

        setSelectedFoodID(selectedFoodId);
        console.log("ID selecionado: ", selectedFoodId);
    }

    const handleSelectedMeal = (selectedMealId: number) => {

        setSelectedMealID(selectedMealId);
        console.log("ID selecionado: ", selectedMealId);
    }

    const handleSelectedCombinedFood = (selectedCombinedFoodIndex: number) => {
        //minus function
        //funcao de remover food de selectedCombinedFoodID que contenha o indice selectedCombinedFoodIndex
        //fazendo um novo array onde tiramos os que possuem o indice indicado na funcao

        const updatedFoodsAndMeals = [...combinedFoodsAndMeals];
        updatedFoodsAndMeals.splice(selectedCombinedFoodIndex, 1);

        console.log("UPDATED FOODS AND MEALS: ", updatedFoodsAndMeals)

        setCombinedFoodsAndMeals(updatedFoodsAndMeals);

    }

    const onPlusButtonAddFood = async () => {
        const foodSelected = await api.getOneFood(selectedFoodId);
        if (foodSelected) {
            setSelectedFoods([...selectedFoods, foodSelected]);
            setCombinedFoodsAndMeals([...combinedFoodsAndMeals, foodSelected]);
        }

    }

    const onPlusButtonAddMeal = async () => {
        const mealSelected = await api.getOneMeal(selectedMealId);
        if (mealSelected) {
            setSelectedMeals([...selectedMeals, mealSelected]);
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

        let idFoodsUnformatted = extractIds(selectedFoods);
        let idMealsUnformatted = extractIds(selectedMeals);

        let idFoods = removeDuplicatesFromArray(idFoodsUnformatted);
        let idMeals = removeDuplicatesFromArray(idMealsUnformatted)


        if (combinedFoodsAndMeals.length > 0) {
            let info: InfoNutritionalDay = {
                id: data.id,
                date: dateSelected.toISOString(),
                portion: sumProperty(combinedFoodsAndMeals, 'portion'),
                protein: sumProperty(combinedFoodsAndMeals, 'protein'),
                calories: sumProperty(combinedFoodsAndMeals, 'calories'),
                grease: sumProperty(combinedFoodsAndMeals, 'grease'),
                salt: sumProperty(combinedFoodsAndMeals, 'salt'),
                finalizedDay: finalizedDay,
                combinedFoods: combinedFoodsAndMeals,
                selectedFoods: selectedFoods,
                selectedMeals: selectedMeals,
                idFoods,
                idMeals
            }


            console.log("Parsed Date: ", parsedDate)
            setInfoNutriDay(info);
        }
    }

    const handleSaveDay = () => {
        console.log("Guardando el dia", infoNutriDay);
    }

    // Função para alternar o estado quando o checkbox for clicado
    const handleCheckboxChange = () => {
        setFinalizedDay(!finalizedDay);
        if (infoNutriDay) {
            setInfoNutriDay({ ...infoNutriDay, finalizedDay: !finalizedDay })
        }
    };

    return (
        <>
            <Head>
                <title>Calendario | BSNutri</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header leftIcon='back' title={selectedDateStringFormatted} rightIcon='menu' onClickLeftIcon={() => router.back()} onClickRightIcon={() => setMenuOpened(!menuOpened)} />
            <Sidebar menuOpened={menuOpened} onClose={() => setMenuOpened(false)} />
            <div className={styles.container}>
                <div className={styles.topButtonArea}>
                    <ButtonMain textButton='Alimento' fill={showSelectFoods ? true : false} onClick={handleFoodButton} disabled={true} />
                    <ButtonMain textButton='Plato' fill={showSelectMeals ? true : false} onClick={handleMealButton} disabled={true} />
                </div>
                {showSelectFoods &&
                    <SelectFood2 foods={foods} textLabel={"Seleccione un alimento"} handleSelectedFood={handleSelectedFood} onPlus={onPlusButtonAddFood} disabled={!finalizedDay} />
                }
                {showSelectMeals &&
                    <SelectFood2 foods={meals} textLabel={"Seleccione un plato preparado"} handleSelectedFood={handleSelectedMeal} onPlus={onPlusButtonAddMeal} disabled={!finalizedDay} />
                }
                <div className={styles.finalizedDayArea}>
                    <input
                        type="checkbox"
                        checked={finalizedDay}
                        onChange={handleCheckboxChange}
                    />
                    <span>Dia terminado?</span>
                </div>
                {combinedFoodsAndMeals.length > 0 &&
                    <>
                        <ComponentsSelected foods={combinedFoodsAndMeals} onHandle={handleSelectedCombinedFood} disabled={!finalizedDay} />
                        {infoNutriDay !== null &&
                            <InfoDayNutritional
                                portionValue={infoNutriDay.portion}
                                proteinValue={infoNutriDay.protein}
                                caloriesValue={infoNutriDay.calories}
                                greaseValue={infoNutriDay.grease}
                                saltValue={infoNutriDay.salt}
                            />
                        }

                        <div className={styles.BottomButtonArea}>
                            <ButtonMain textButton='Volver' fill={false} onClick={() => router.push('/calendar')} disabled={true} />
                            <ButtonMain textButton='Guardar' fill={true} onClick={handleSaveDay} disabled={true} />
                        </div>
                    </>

                }
            </div>

        </>
    )
}


export default DatePage;

type ServerProps = {
    id: string; // Defina o tipo da prop "date" como string
    foods: Food[];
    meals: Meal[];
    infoDay: InfoNutritionalDay | null;
    token: string;
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    // Extrair o ID da URL usando o objeto context
    const token = context.req.headers.cookie?.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1] || '';


    let { date } = context.query;
    let idFoodsInfoNutriDayNumber: number[]
    let idMealsInfoNutriDayNumber: number[]


    console.log("TOKEN:", token)
    console.log(date)

    const api = useApi2(token);

    let infoDay: InfoNutritionalDay | null = null;

    const foods = await api.getFoods();
    const meals = await api.getMeals();
    let selectedFoods: Food[] = [];
    let selectedMeals: Meal[] = [];
    let combinedFoodsAndMeals: (Food | Meal)[] = [];


    let infoDayRequisition = await api.getInfoDay(date as string);

    if (infoDayRequisition.msgError) {
        infoDay = null
        infoDayRequisition = null
    }

    if (infoDayRequisition) {
        idFoodsInfoNutriDayNumber = infoDayRequisition.infonutriday_has_foods.map((item: any) => item.foods_id)
        idMealsInfoNutriDayNumber = infoDayRequisition.infonutriday_has_meals.map((item: any) => item.meals_id)
        selectedFoods = foods.filter((food: Food) => idFoodsInfoNutriDayNumber.includes(food.id));
        selectedMeals = foods.filter((meal: Meal) => idMealsInfoNutriDayNumber.includes(meal.id));
        combinedFoodsAndMeals = selectedFoods.concat(selectedMeals)

        infoDay = {
            id: infoDayRequisition.id,
            date: infoDayRequisition.date,
            finalizedDay: infoDayRequisition.finalizedDay,
            portion: infoDayRequisition.portion,
            calories: infoDayRequisition.calories,
            protein: infoDayRequisition.protein,
            grease: infoDayRequisition.grease,
            salt: infoDayRequisition.salt,
            combinedFoods: combinedFoodsAndMeals,
            selectedFoods: selectedFoods,
            selectedMeals: selectedMeals,
            idFoods: idFoodsInfoNutriDayNumber,
            idMeals: idMealsInfoNutriDayNumber
        }



    }

    let id = date?.toString();
    console.log("ID pegado: ", id);


    return {
        props: {
            id: id as string,
            foods,
            meals,
            infoDay,
            token
        }
    }
}


//const [combinedFoodsAndMeals, setCombinedFoodsAndMeals] = useState<Meal[] | Food[]>([...data.foods, ...data.meals]);