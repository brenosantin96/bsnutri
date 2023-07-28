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

// Importe o componente usando dynamic
const CalendarComponent = dynamic(() => import('../../components/CalendarComponent/index'), {
    ssr: false, // Desativar o carregamento no lado do servidor (Server-Side Rendering)
});


const Calendar = (data: ServerProps) => {

    const api = useApi();
    const auth = useContext(AuthContext);
    const router = useRouter();
    const { date } = router.query;

    const [menuOpened, setMenuOpened] = useState(false);



    return (
        <>
            <Head>
                <title>Calendario | BSNutri</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header leftIcon='back' title={date as string} rightIcon='menu' onClickLeftIcon={() => router.push('/calendar')} onClickRightIcon={() => setMenuOpened(!menuOpened)} />
            <Sidebar menuOpened={menuOpened} onClose={() => setMenuOpened(false)} />

            <div className={styles.container}>

            </div>

        </>
    )
}


export default Calendar;

type ServerProps = {
    id: string
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    // Extrair o ID da URL usando o objeto context
    console.log(context.query);

    return {
        props: {
            
        }
    }
}