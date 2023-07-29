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
import { parse, toDate } from 'date-fns';
import { es } from 'date-fns/locale';
import {capitalizeFourthLetter, replaceDashWithSlash} from '../../helpers/Formatters';


// Importe o componente usando dynamic
const CalendarComponent = dynamic(() => import('../../components/CalendarComponent/index'), {
    ssr: false, // Desativar o carregamento no lado do servidor (Server-Side Rendering)
});


const Calendar = (data: ServerProps) => {

    const api = useApi();
    const auth = useContext(AuthContext);
    const router = useRouter();

    const [menuOpened, setMenuOpened] = useState(false);

    //managing the Date
    const selectedDateString = replaceDashWithSlash(data.date);
    const formatString = 'dd/MMM/yyyy';

    // Utilize a função parse para converter a string em um objeto Date
    const parsedDate = parse(selectedDateString, formatString, new Date());

    useEffect(() => {
        console.log("Data.date: ", data.date);
        console.log("Selected Date String: ", selectedDateString);
    }, []);

    return (
        <>
            <Head>
                <title>Calendario | BSNutri</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header leftIcon='back' title={data.date} rightIcon='menu' onClickLeftIcon={() => router.push('/calendar')} onClickRightIcon={() => setMenuOpened(!menuOpened)} />
            <Sidebar menuOpened={menuOpened} onClose={() => setMenuOpened(false)} />
            <div>{parsedDate.toString()}</div>
            <div className={styles.container}>

            </div>

        </>
    )
}


export default Calendar;

type ServerProps = {
    date: string; // Defina o tipo da prop "date" como string
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    // Extrair o ID da URL usando o objeto context
    const { date } = context.query;

    return {
        props: {
            date: date as string,
        }
    }
}