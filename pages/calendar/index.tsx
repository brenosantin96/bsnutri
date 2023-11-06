import { Header } from '@/components/Header';
import dynamic from 'next/dynamic';
import { Sidebar } from '@/components/Sidebar';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import styles from '../../styles/Calendar.module.css'
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { GetServerSideProps } from 'next';

// Importe o componente usando dynamic
const CalendarComponent = dynamic(() => import('../../components/CalendarComponent/index'), {
  ssr: false, // Desativar o carregamento no lado do servidor (Server-Side Rendering)
});


const Calendar = () => {

  const auth = useContext(AuthContext);
  const router = useRouter();
  const [menuOpened, setMenuOpened] = useState(false);

  //Calendario
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateClick = (date: Date) => {
    // Aqui você pode realizar a ação que deseja quando uma data é clicada no calendário.
    const formattedDate = format(date, 'dd-MMM-yyyy', { locale: es });

    console.log('Data selecionada:', formattedDate);
    setSelectedDate(date);

    router.push({
      pathname: `/calendar/${formattedDate}`,
    })
  };



  return (
    <>
      <Head>
        <title>Calendario | BSNutri</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header leftIcon='back' title='Calendário' rightIcon='menu' onClickLeftIcon={() => router.push('/')} onClickRightIcon={() => setMenuOpened(!menuOpened)} />
      <Sidebar menuOpened={menuOpened} onClose={() => setMenuOpened(false)} />

      <div className={styles.container}>
        <div className={styles.messageOfTheDay}>
          ¿Qué tal si empiezas por planificar tu semana?
        </div>
        <CalendarComponent onChangez={handleDateClick} selectedDate={selectedDate} />
      </div>

    </>
  )
}

export default Calendar;

