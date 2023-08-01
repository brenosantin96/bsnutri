import { useApi } from "@/libs/useApi";
import { Food } from "@/types/Food";
import { InfoNutritionalDay } from "@/types/InfoNutritionalDay";
import { Meal } from "@/types/Meal";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

const DatePage = ({ data }: { data: ServerProps; }) => {



    useEffect(() => {
        console.log(data.infoDay);
    }, [])

   
    return (
        <>
            
            

        </>
    )
}

type ServerProps = {
    date: string; // Defina o tipo da prop "date" como string
    foods: Food[];
    meals: Meal[];
    infoDay: InfoNutritionalDay | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    // Extrair o ID da URL usando o objeto context
    const { date } = context.query;

    const api = useApi();
    const foods = await api.getFoods();
    const meals = await api.getMeals();
    let infoDay = await api.getInfoDay(date as string);

    console.log(infoDay);


    return {
        props: {
            date: date as string,
            foods,
            meals,
        }
    }
}