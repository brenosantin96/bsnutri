import { FoodComponent2 } from '@/components/FoodComponent2';
import { Header } from '@/components/Header';
import { ButtonMain } from '@/components/ButtonMain';
import { useApi } from '@/libs/useApi';
import { Food } from '@/types/Food';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styles from '../../styles/Food-id.module.css';
import { useState } from 'react';


const FoodId = (data: ServerProps) => {

    const router = useRouter();

    const [isEdditing, setIsEdditing] = useState(false);
    const [cancelled, setIsCancelled] = useState(true);

    const startEdditing = () => {
        setIsEdditing(true);
        setIsCancelled(false);
    }

    const saveEdittedFood = () => {
        console.log("Salvado o food")
    }

    const cancelSave = () => {
        setIsEdditing(false)
        setIsCancelled(true);
    }

  

    return (
        <>
            <Header title={data.food.name} leftIcon='back' onClickLeftIcon={() => router.push('/foods')} />
            <div className={styles.container}>

                <div className={styles.areaEditButton}>
                    <ButtonMain onClick={startEdditing} textButton={"Editar"} fill={false} />
                </div>
                <FoodComponent2 light={true} data={data.food} isEdditing={isEdditing} cancelled={cancelled} />

                <div className={styles.backAndSaveArea}>
                    <ButtonMain onClick={cancelSave} textButton={"Cancelar"} fill={false} />
                    <ButtonMain onClick={saveEdittedFood} textButton={"Guardar"} fill={true} />
                </div>
            </div>
        </>
    )
}

export default FoodId;

type ServerProps = {
    food: Food;
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    // Extrair o ID da URL usando o objeto context
    const { id } = context.query;

    const api = useApi();

    //Get products
    const food = await api.getOneFood(parseInt(id as string));


    return {
        props: {
            food
        }
    }
}