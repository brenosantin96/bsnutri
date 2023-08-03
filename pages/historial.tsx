import { ButtonMain } from '@/components/ButtonMain';
import { Header } from '@/components/Header';
import Head from 'next/head'
import { useRouter } from 'next/router';
import styles from '../styles/Historial.module.css'
import { FoodComponent } from '@/components/FoodComponent';
import { Icon } from '@/components/Icon';
import { GetServerSideProps } from 'next';
import { useApi } from '@/libs/useApi';
import { Food } from '@/types/Food';
import { InfoNutritionalDay } from '../types/InfoNutritionalDay';
import { useEffect, useState } from 'react';
import { HistorialComponent } from '@/components/HistorialComponent';


const HistorialPage = (data: ServerProps) => {


    const router = useRouter();

    const [infoNutriDays, setInfoNutriDays] = useState<InfoNutritionalDay[]>(data.allInfoDayOfUser);


    return (
        <>
            <Head>
                <title>Historial | BSNutri</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header leftIcon='back' title='Historial' onClickLeftIcon={() => router.push('/calendar')} />

            <div className={styles.container}>

                <div className={styles.historialArea}>
                    {infoNutriDays.map((item, index) => (
                        <HistorialComponent infoNutriDay={item} light={index % 2 === 0} />
                    ))}
                </div>

            </div>

        </>
    )
}


export default HistorialPage;


type ServerProps = {
    allInfoDayOfUser: InfoNutritionalDay[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const api = useApi();

    //Get products
    const allInfoDayOfUser = await api.getAllInfoDay();


    return {
        props: {
            allInfoDayOfUser
        }
    }
}
