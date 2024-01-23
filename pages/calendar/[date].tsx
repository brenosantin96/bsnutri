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
import { Food, FoodInfoNutriDay } from '@/types/Food';
import { Meal, MealInfoNutriDay } from '@/types/Meal';
import { ButtonMain } from '../../components/ButtonMain';
import { ComponentsSelected } from '@/components/ComponentsSelected';
import { InfoDayNutritional } from '@/components/InfoDayNutritional';
import { sumProperty } from '@/helpers/sumProperty';
import { InfoNutritionalDay } from '../../types/InfoNutritionalDay';
import { extractIds, removeDuplicatesFromArray } from '../../helpers/getIds';
import { useApi2 } from '@/libs/useapi2';
import { foodsInfoNutriDay, mealsInfoNutriDay } from '@/types/foodsInfoNutriDay';
import { createFoodArrayWithQnt, createFoodArrayWithQnt2, createMealArrayWithQnt, createMealArrayWithQnt2 } from '@/helpers/sumIdItems';

const DatePage = (data: ServerProps) => {


    const router = useRouter();
    const api = useApi2(data.token);

    useEffect(() => {
        console.log("[DATE] DATA INFO DAY", data.infoDay)
        console.log("[DATE] FOODS INFO DAY COM QUANTIDADE", data.allFoodsInfoNutriDay)
        console.log("[DATE] MEALS INFO DAY COM QUANTIDADE", data.allMealsInfoNutriDay)
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

    //foods and meals of infoNutriDay
    const [selectedFoodsOfInfoDay, setSelectedFoodsOfInfoDay] = useState<foodsInfoNutriDay[] | null>(infoNutriDay !== null ? data.allFoodsInfoNutriDay : [])
    const [selectedMealsOfInfoDay, setSelectedMealsOfInfoDay] = useState<mealsInfoNutriDay[] | null>(infoNutriDay !== null ? data.allMealsInfoNutriDay : [])

    const [selectedMeals, setSelectedMeals] = useState<Meal[]>(infoNutriDay !== null ? infoNutriDay.selectedMeals : []);
    const [selectedFoods, setSelectedFoods] = useState<Food[]>(infoNutriDay !== null ? infoNutriDay.selectedFoods : []);

    const [selectedMealsCounted, setSelectedMealsCounted] = useState<MealInfoNutriDay[]>(infoNutriDay !== null ? createMealArrayWithQnt2(selectedMeals, data.allMealsInfoNutriDay as mealsInfoNutriDay[]) : [])
    const [selectedFoodsCounted, setSelectedFoodsCounted] = useState<FoodInfoNutriDay[]>(infoNutriDay !== null ? createFoodArrayWithQnt2(selectedFoods, data.allFoodsInfoNutriDay as foodsInfoNutriDay[]) : [])

    //createFoodArrayWithQnt



    useEffect(() => {
        console.log("[DATE] SelectedMeals Ao cargar a pagina:", selectedMeals)
        console.log("[DATE] SelectedFoods Ao cargar a pagina:", selectedFoods)
        console.log("[DATE] Combined Meals And Foods", combinedFoodsAndMeals)
        console.log("[DATE] selectedFoodsCounted", selectedFoodsCounted)
        console.log("[DATE] selectedMealsCounted", selectedMealsCounted)
    }, [])


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

    const handleSelectedCombinedFood = (selectedCombinedFoodIndex: number, isMeal: boolean) => {
        //minus function
        //funcao de remover food de selectedCombinedFoodID que contenha o indice selectedCombinedFoodIndex
        //fazendo um novo array onde tiramos os que possuem o indice indicado na funcao

        const updatedFoodsAndMeals = [...combinedFoodsAndMeals];
        updatedFoodsAndMeals.splice(selectedCombinedFoodIndex, 1);
        setCombinedFoodsAndMeals(updatedFoodsAndMeals);

        if (isMeal) {
            const updatedMeals = [...selectedMeals];
            updatedMeals.splice(selectedCombinedFoodIndex, 1);
            setSelectedMeals(updatedMeals)
        }

        if (!isMeal) {
            const updatedFoods = [...selectedFoods];
            updatedFoods.splice(selectedCombinedFoodIndex, 1);
            setSelectedFoods(updatedFoods)
        }

    }

    const onPlusButtonAddFood = async () => {
        const foodSelected = await api.getOneFood(selectedFoodId);

        if (foodSelected) {

            const existingFoodIndex = selectedFoodsCounted.findIndex(food => food.id === foodSelected.id);

            if (existingFoodIndex !== -1) {
                // O alimento já está na lista, incrementar a quantidade
                const updatedFoods = [...selectedFoodsCounted];
                updatedFoods[existingFoodIndex].qtde++;
                setSelectedFoodsCounted(updatedFoods);
            } else {
                // Adicionar o alimento à lista
                setSelectedFoodsCounted([...selectedFoodsCounted, { ...foodSelected, qtde: 1 }]);
            }

        }

        setCombinedFoodsAndMeals([...combinedFoodsAndMeals, foodSelected]);


    }

    /* const onPlusButtonAddFood = async () => {
        const foodSelected = await api.getOneFood(selectedFoodId);

        if (foodSelected) {


            setSelectedFoods([...selectedFoods, foodSelected]);
            setCombinedFoodsAndMeals([...combinedFoodsAndMeals, foodSelected]);
        }

    }
 */


    const onPlusButtonAddMeal = async () => {
        const mealSelected = await api.getOneMeal(selectedMealId);

        if (mealSelected) {

            const existingMealIndex = selectedMealsCounted.findIndex(food => food.id === mealSelected.id);

            if (existingMealIndex !== -1) {
                // O alimento já está na lista, incrementar a quantidade
                const updatedMeals = [...selectedMealsCounted];
                updatedMeals[existingMealIndex].qtde++;
                setSelectedMealsCounted(updatedMeals);
            } else {
                // Adicionar o alimento à lista
                setSelectedMealsCounted([...selectedMealsCounted, { ...mealSelected, qtde: 1 }]);
            }

        }

        setCombinedFoodsAndMeals([...combinedFoodsAndMeals, mealSelected]);


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


        if (selectedMeals.length > 0 || selectedFoods.length > 0) {

            let info: InfoNutritionalDay = {
                id: data.id,
                date: dateSelected.toISOString(),
                portion: sumProperty(selectedFoods, 'portion') + sumProperty(selectedMeals, 'portion'),
                protein: sumProperty(selectedFoods, 'protein') + sumProperty(selectedMeals, 'protein'),
                calories: sumProperty(selectedFoods, 'calories') + sumProperty(selectedMeals, 'calories'),
                grease: sumProperty(selectedFoods, 'grease') + sumProperty(selectedMeals, 'grease'),
                salt: sumProperty(selectedFoods, 'salt') + sumProperty(selectedMeals, 'salt'),
                finalizedDay: finalizedDay,
                combinedFoods: combinedFoodsAndMeals,
                selectedFoods: selectedFoods,
                selectedMeals: selectedMeals,
                idFoods: idFoodsUnformatted,
                idMeals: idMealsUnformatted

            }


            console.log("Parsed Date: ", parsedDate)
            setInfoNutriDay(info);
        }
    }

    const handleSaveDay = async () => {

        if (infoNutriDay) {
            let response = await api.saveInfoNutriDay(data.id, new Date(infoNutriDay?.date), infoNutriDay.portion, infoNutriDay.protein,
                infoNutriDay.calories, infoNutriDay.grease, infoNutriDay.salt, infoNutriDay.finalizedDay === true ? 1 : 0,
                infoNutriDay.idFoods, infoNutriDay.idMeals)

            console.log(response);

        }

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
                {(selectedMealsCounted.length > 0 || selectedFoodsCounted.length > 0) &&
                    <>
                        <ComponentsSelected
                            foods={combinedFoodsAndMeals}
                            selectedFoods={selectedFoods}
                            selectedMeals={selectedMeals}
                            selectedFoodsWithCount={selectedFoodsCounted}
                            selectedMealsWithCount={selectedMealsCounted}
                            onHandle={handleSelectedCombinedFood}
                            disabled={!finalizedDay}
                            selectedFoodsOfInfoDay={selectedFoodsOfInfoDay}
                            selectedMealsOfInfoDay={selectedMealsOfInfoDay}
                        />
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
    allFoodsInfoNutriDay: foodsInfoNutriDay[] | null;
    allMealsInfoNutriDay: mealsInfoNutriDay[] | null;
    token: string;
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    // Extrair o ID da URL usando o objeto context
    const token = context.req.headers.cookie?.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1] || '';


    let { date } = context.query;
    let idFoodsInfoNutriDayNumber: number[]
    let idMealsInfoNutriDayNumber: number[]


    const api = useApi2(token);

    let infoDay: InfoNutritionalDay | null = null;

    const foods = await api.getFoods();
    const meals = await api.getMeals();
    let selectedFoods: Food[] = [];
    let selectedMeals: Meal[] = [];
    let combinedFoodsAndMeals: (Food | Meal)[] = [];


    let infoDayRequisition = await api.getInfoDay(date as string);
    let allFoodsInfoNutriDay: foodsInfoNutriDay[] = []
    let allMealsInfoNutriDay: mealsInfoNutriDay[] = []

    if (infoDayRequisition.msgError) {
        infoDay = null
        infoDayRequisition = null
    }

    if (infoDayRequisition) {



        idFoodsInfoNutriDayNumber = infoDayRequisition.infoNutriDay.infonutriday_has_foods.map((item: any) => item.foods_id)
        idMealsInfoNutriDayNumber = infoDayRequisition.infoNutriDay.infonutriday_has_meals.map((item: any) => item.meals_id)

        selectedFoods = foods.filter((food: Food) => idFoodsInfoNutriDayNumber.includes(food.id)); //desses selectedFoods, devo pegar a quantidade
        selectedMeals = meals.filter((meal: Meal) => idMealsInfoNutriDayNumber.includes(meal.id)); //desses selectedMeals, devo pegar a quantidade
        combinedFoodsAndMeals = selectedFoods.concat(selectedMeals)

        infoDay = {
            id: infoDayRequisition.infoNutriDay.id,
            date: infoDayRequisition.infoNutriDay.date,
            finalizedDay: infoDayRequisition.infoNutriDay.finalizedDay,
            portion: infoDayRequisition.infoNutriDay.portion,
            calories: infoDayRequisition.infoNutriDay.calories,
            protein: infoDayRequisition.infoNutriDay.protein,
            grease: infoDayRequisition.infoNutriDay.grease,
            salt: infoDayRequisition.infoNutriDay.salt,
            combinedFoods: combinedFoodsAndMeals,
            selectedFoods: selectedFoods,
            selectedMeals: selectedMeals,
            idFoods: idFoodsInfoNutriDayNumber,
            idMeals: idMealsInfoNutriDayNumber
        }


        allFoodsInfoNutriDay = infoDayRequisition.foodsInfoNutriDay
        allMealsInfoNutriDay = infoDayRequisition.mealsInfoNutriDay



    }

    let id = date?.toString();

    return {
        props: {
            id: id as string,
            foods,
            meals,
            infoDay,
            allFoodsInfoNutriDay,
            allMealsInfoNutriDay,
            token
        }
    }
}


/*
NOTA DO DIA 18 de janeiro de 2024
COM A INFORMACAO CAPTURADA DA QUANTIDADE, AGORA POSSO ATUALIZAR A QUANTIDADE CORRETAMENTE
UTILIZAR A INFORMACAO TRAZIDA DO CARRINHO

*/


//const [combinedFoodsAndMeals, setCombinedFoodsAndMeals] = useState<Meal[] | Food[]>([...data.foods, ...data.meals]);

/* NOTA DO DIA 22/01/2023 
FOI CORRIGIDO A QUANTIDADE APRESENTADA, MAS AGORA FALTA CORRIGIR A FUNCAO DE RETIRAR O ITEM E FALTA CORRIGIR O AMOUNT DOS ITEMS
*/