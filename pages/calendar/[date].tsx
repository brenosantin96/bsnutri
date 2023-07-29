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


const Calendar = (data: ServerProps) => {

    const router = useRouter();
    const api = useApi();

    const [menuOpened, setMenuOpened] = useState(false);

    //handling the Date to use later
    const selectedDateString = replaceDashWithSlash(data.date);
    const formatString = 'dd/MMM/yyyy';
    const parsedDate = parse(selectedDateString, formatString, new Date());

    //select
    const [combinedFoodsAndMeals, setCombinedFoodsAndMeals] = useState<Meal[] | Food[]>([...data.foods, ...data.meals]);
    const [selectedFoodId, setSelectedFoodID] = useState<number>(0);

    const handleSelectedFood = (selectedFoodId: number) => {
        setSelectedFoodID(selectedFoodId)
    }

    const onPlusButtonAddFood = async () => {



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
                <SelectFood2 foods={combinedFoodsAndMeals} textLabel={"Seleccione un alimento/plato"} handleSelectedFood={handleSelectedFood} onPlus={onPlusButtonAddFood} disabled={true} />
            </div>

        </>
    )
}


export default Calendar;

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