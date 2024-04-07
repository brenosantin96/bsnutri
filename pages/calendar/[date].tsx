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
import { extractIds, removeDuplicatesFromArray, transformFoodQuantityInNumberInArray, transformMealQuantityInNumberInArray } from '../../helpers/getIds';
import { useApi2 } from '@/libs/useapi2';
import { foodsInfoNutriDay, mealsInfoNutriDay } from '@/types/foodsInfoNutriDay';
import { createFoodArrayWithQnt, createFoodArrayWithQnt2, createMealArrayWithQnt, createMealArrayWithQnt2 } from '@/helpers/sumIdItems';
import { infoDayData } from '@/data/InfoNutritionalDay';
import { getAllFoodsAndPutInACombinedArray, getAllMealsAndPutInACombinedArray, selectedFoodsForCombinedFoodsMinusFunction, selectedMealsForCombinedFoodsMinusFunction } from '@/helpers/functionsInfoNutriDay';
import FastModal from '@/components/FastModal';
import { ModalExclude } from '@/components/ModalExclude';
import { ModalExclude2 } from '@/components/ModalExclude2';

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

    //removeItem Modal
    const [isModalOpen, setIsModalOpen] = useState(false);


    //check Finalized day
    const [finalizedDay, setFinalizedDay] = useState(false);

    //check updatedDay
    const [hasUpdated, setHasUpdated] = useState(false);
    const [hasFinishedUpdate, setHasFinishedUpdate] = useState(false);
    const [savedButton, setSavedButton] = useState(false);


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

        if (hasFinishedUpdate === true) {
            router.push('/calendar')
        }

    }, [hasFinishedUpdate])


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

    const handleMinusSelectedFood = (selectedCombinedFoodId: number, isMeal: boolean) => {

        //criar uma funcao onde pego newSelectedFoodsCounted e crio um array de foods repetidos, de acordo com newSelectedFoodsCounted.


        if (!isMeal) {
            const foodToRemove = selectedFoodsCounted.find((item) => item.id === selectedCombinedFoodId);

            if (foodToRemove) {

                if (foodToRemove.qtde >= 1) {
                    const newSelectedFoodsCounted = selectedFoodsCounted.map((item) => {
                        if (item.id === foodToRemove.id) {
                            return { ...item, qtde: item.qtde - 1 };
                        }

                        return item

                    })

                    let selectedFoodsForCombined = selectedFoodsForCombinedFoodsMinusFunction(newSelectedFoodsCounted as FoodInfoNutriDay[])
                    let selectedMealsForCombined = selectedMealsForCombinedFoodsMinusFunction(selectedMealsCounted)
                    let newCombinedFoodsAndMeals: (Food[] | Meal[]) = selectedFoodsForCombined.concat(selectedMealsForCombined)
                    //console.log("selectedFoodsForCombined", selectedFoodsForCombined)
                    //console.log("selectedMealsForCombined", selectedMealsForCombined)
                    //console.log("newCombinedFoodsAndMeals", newCombinedFoodsAndMeals)

                    //console.log("selectedFoodsCounted", selectedFoodsCounted)
                    //console.log("selectedMealsCounted", selectedMealsCounted)

                    setCombinedFoodsAndMeals(newCombinedFoodsAndMeals)
                    setSelectedFoodsCounted(newSelectedFoodsCounted as FoodInfoNutriDay[])
                }
                if (foodToRemove.qtde === 1) {
                    const updatedFoods = selectedFoodsCounted.filter((item) => item.id !== selectedCombinedFoodId)
                    setSelectedFoodsCounted(updatedFoods)
                }
            }

        }
    }



    const handleMinusSelectedMeal = (selectedCombinedMealId: number, isMeal: boolean) => {


        if (isMeal) {
            const mealToRemove = selectedMealsCounted.find((item) => item.id === selectedCombinedMealId);

            if (mealToRemove) {

                if (mealToRemove.qtde >= 1) {
                    const newSelectedMealsCounted = selectedMealsCounted.map((item) => {
                        if (item.id === selectedCombinedMealId) {
                            return { ...item, qtde: item.qtde - 1 };
                        }

                        return item
                    })

                    let selectedFoodsForCombined = selectedFoodsForCombinedFoodsMinusFunction(selectedFoodsCounted)
                    let selectedMealsForCombined = selectedMealsForCombinedFoodsMinusFunction(newSelectedMealsCounted as MealInfoNutriDay[])
                    let newCombinedFoodsAndMeals: (Food[] | Meal[]) = selectedFoodsForCombined.concat(selectedMealsForCombined)
                    //console.log("selectedFoodsForCombined", selectedFoodsForCombined)
                    //console.log("selectedMealsForCombined", selectedMealsForCombined)
                    //console.log("newCombinedFoodsAndMeals", newCombinedFoodsAndMeals)

                    setCombinedFoodsAndMeals(newCombinedFoodsAndMeals)
                    setSelectedMealsCounted(newSelectedMealsCounted as MealInfoNutriDay[])
                }
                if (mealToRemove.qtde === 1) {
                    const updatedMeals = selectedMealsCounted.filter((item) => item.id !== selectedCombinedMealId)
                    setSelectedMealsCounted(updatedMeals)
                }
            }

        }
    }



    const onPlusButtonAddFood = async () => {
        const foodSelected = await api.getOneFood(selectedFoodId);

        if (!foodSelected) {
            alert("Escolha uma refeicao")
            return
        }

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

        if (!mealSelected) {
            alert("Escolha uma refeicao")
            return
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

        let idFoodsUnformatted2 = transformFoodQuantityInNumberInArray(selectedFoodsCounted)
        let idMealsUnformatted2 = transformMealQuantityInNumberInArray(selectedMealsCounted)

        console.log("selectedFoodsCounted de handleUpdateInfoNutritionalDay", selectedFoodsCounted)
        console.log("selectedMealsCounted de handleUpdateInfoNutritionalDay", selectedMealsCounted)

        console.log("idFoodsUnformatted2", idFoodsUnformatted2)
        console.log("idMealsUnformatted2", idMealsUnformatted2)


        if (selectedMealsCounted.length > 0 || selectedFoodsCounted.length > 0) {

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
                selectedFoods: selectedFoodsCounted,
                selectedMeals: selectedMealsCounted,
                idFoods: idFoodsUnformatted2,
                idMeals: idMealsUnformatted2

            }

            console.log("combinedFoodsAndMeals", combinedFoodsAndMeals)
            setInfoNutriDay(info);
            console.log("INFO NUTRI DAY SETADO: ", info)
        }

    }

    const handleSaveDay = async () => {

        if (infoNutriDay) {
            let response = await api.saveInfoNutriDay(data.id, new Date(infoNutriDay?.date), infoNutriDay.portion, infoNutriDay.protein,
                infoNutriDay.calories, infoNutriDay.grease, infoNutriDay.salt, infoNutriDay.finalizedDay === true ? 1 : 0,
                infoNutriDay.idFoods, infoNutriDay.idMeals)

            console.log(response);
        }

        setSavedButton(true);
        console.log("Guardando el dia", infoNutriDay);
    }

    // Função para alternar o estado quando o checkbox for clicado
    const handleCheckboxChange = () => {
        setFinalizedDay(!finalizedDay);
        if (infoNutriDay) {
            setInfoNutriDay({ ...infoNutriDay, finalizedDay: !finalizedDay })
        }
    };

    const handleUpdateDay = async () => {

        console.log("Actualizando el infoNutriDay")

        console.log(data.fullId)

        if (infoNutriDay) {

            console.log("INFONUTRIDAY sendo enviado", infoNutriDay)


            //ESTA ATUALIZANDO MAS ESTA ATUALIZANDO COM DADOS ANTIGOS. 
            //corrigido os dados que estao sendo enviados, agora esta sendo enviado o id full
            let response = await api.updateInfoNutriDay(data.fullId, new Date(infoNutriDay.date), infoNutriDay.portion, infoNutriDay.protein,
                infoNutriDay.calories, infoNutriDay.grease, infoNutriDay.salt, infoNutriDay.finalizedDay === true ? 1 : 0,
                infoNutriDay.idFoods, infoNutriDay.idMeals)

            console.log(response);

            setHasUpdated(true)
        }

    }

    const hasUpdatedDay = (updatedDay: boolean) => {
        setHasFinishedUpdate(updatedDay)
    }

    const openModalToRemoveInfoNutriDay = () => {
        setIsModalOpen(true);
    }

    const handleDeleteDay = async (id: string) => {

        console.log(id)
        let response = await api.deleteInfoNutriDay(id)
        if (response.msg) {
            router.back()
        } else

            alert("Ha ocurrido un error")


    }


    return (
        <>
            {hasUpdated &&
                <FastModal text='Guardado con éxito' timer={1500} hasUpdated={hasUpdatedDay} />
            }
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
                            onHandleMinusFood={handleMinusSelectedFood}
                            onHandleMinusMeal={handleMinusSelectedMeal}
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

                            <ButtonMain textButton='Eliminar' fill={true} onClick={openModalToRemoveInfoNutriDay} disabled={data.infoDay ? true : false} />

                            {!data.infoDay &&
                                <ButtonMain textButton='Guardar' fill={true} onClick={handleSaveDay} disabled={savedButton === false ? true : false} />
                            }

                            {data.infoDay &&
                                <ButtonMain textButton='Actualizar' fill={true} onClick={handleUpdateDay} disabled={true} />
                            }
                        </div>


                        {isModalOpen && data.infoDay && infoNutriDay &&
                            <div>
                                <ModalExclude2 id={data.infoDay.id} valueToRemove={infoNutriDay.id} menuOpened={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)} onDelete={handleDeleteDay} />
                                <div className={styles.backdrop} />
                            </div>
                        }
                    </>

                }
            </div>

        </>
    )
}


export default DatePage;

//botao de deletar feito, trabalhando no modal para confirmar
//clicou em eliminar, vai saltar opcao perguntando se realmente quer eliminar o dia
//assim que confirmado, executar a funcao handleDeleteDay

type ServerProps = {
    id: string; // Defina o tipo da prop "date" como string
    fullId: string;
    foods: Food[];
    meals: Meal[];
    infoDay: InfoNutritionalDay | null;
    allFoodsInfoNutriDay: foodsInfoNutriDay[] | null;
    allMealsInfoNutriDay: mealsInfoNutriDay[] | null;
    token: string;
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    // Extrair o ID da URL usando o objeto context

    console.log("HEADERS: ", context.req.headers)

    const token = context.req.headers.cookie?.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1] || '';


    let { date } = context.query;
    let idFoodsInfoNutriDayNumber: number[]
    let idMealsInfoNutriDayNumber: number[]
    let fullId = "";

    const api = useApi2(token);

    let infoDay: InfoNutritionalDay | null = null;

    const foods = await api.getFoods();
    const meals = await api.getMeals();
    let selectedFoods: Food[] = [];
    let selectedMeals: Meal[] = [];
    let selectedFoodsForCombinedFoods: Food[] = []; //isso para trazer de forma repetida em combinedFoods
    let selectedMealsForCombinedMeals: Meal[] = []; //isso para trazer de forma repetida em combinedFoods
    let combinedFoodsAndMeals: (Food | Meal)[] = [];


    let infoDayRequisition = await api.getInfoDay(date as string);
    let allFoodsInfoNutriDay: foodsInfoNutriDay[] = []
    let allMealsInfoNutriDay: mealsInfoNutriDay[] = []

    if (infoDayRequisition.msgError) {
        infoDay = null
        infoDayRequisition = null
    }

    if (infoDayRequisition) {

        fullId = infoDayRequisition.infoNutriDay.id;

        idFoodsInfoNutriDayNumber = infoDayRequisition.infoNutriDay.infonutriday_has_foods.map((item: any) => item.foods_id)
        idMealsInfoNutriDayNumber = infoDayRequisition.infoNutriDay.infonutriday_has_meals.map((item: any) => item.meals_id)

        selectedFoods = foods.filter((food: Food) => idFoodsInfoNutriDayNumber.includes(food.id)); //desses selectedFoods, devo pegar a quantidade
        selectedMeals = meals.filter((meal: Meal) => idMealsInfoNutriDayNumber.includes(meal.id)); //desses selectedMeals, devo pegar a quantidade

        //COMBINED FOODS AND MEALS NAO ESTA TRAZENDO OS FOODS REPETIDAMENTE, DE ACORDO COM A QUANTIDADE, E DEVE SIM TRAZER
        //DEVO FILTRAR A LISTA DE allFoodsInfoNutriDay e allMealsInfoNutriDay PARA QUE ME TRAGA DE FORMA REPETIDA


        allFoodsInfoNutriDay = infoDayRequisition.foodsInfoNutriDay
        allMealsInfoNutriDay = infoDayRequisition.mealsInfoNutriDay

        //selectedFoodsForCombinedFoods = allFoodsInfoNutriDay.filter((food: foodsInfoNutriDay) => idFoodsInfoNutriDayNumber.includes(food.id));

        selectedFoodsForCombinedFoods = getAllFoodsAndPutInACombinedArray(allFoodsInfoNutriDay, selectedFoods);
        selectedMealsForCombinedMeals = getAllMealsAndPutInACombinedArray(allMealsInfoNutriDay, selectedMeals)
        combinedFoodsAndMeals = selectedFoodsForCombinedFoods.concat(selectedMealsForCombinedMeals)

        /*  allFoodsInfoNutriDay.forEach((item) => {
            const foodToAdd = selectedFoods.find((food: Food) => food.id === item.food_id)
            if (foodToAdd) {
                for (let i = 0; i < item.qtde; i++) {
                    selectedFoodsForCombinedFoods.push(foodToAdd);
                }
            }
        }) */



        //console.log("idFoodsInfoNutriDayNumber", idFoodsInfoNutriDayNumber)
        //console.log("selectedFoods", selectedFoods)
        //console.log("selectedMeals", selectedMeals)
        //console.log("combinedFoodsAndMeals", combinedFoodsAndMeals)

        console.log("infoDayRequisition.infoNutriDay", infoDayRequisition.infoNutriDay)

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



    }

    let id = date?.toString();

    return {
        props: {
            id: id as string,
            fullId,
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

/* NOTA DO DIA 07/02/2023
CORRIGIR QUANDO SE POSSUI 02 TIPOS DE FOOD E AO BORRAR O ULTIMO, AINDA ASSIM É ENVIADO NA REQUISICAO DE UPDATE
MESMO BORRANDO O ELEMENTO 03, É ENVIADO OS DEMAIS TIPOS DE ELEMENTO
idFoods: (5) [1, 1, 1, 1, 3]
*/