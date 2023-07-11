import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/Calendar.module.css'


const Calendar = () => {

  const [menuOpened, setMenuOpened] = useState(false);

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Calendario | BSNutri</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <Header leftIcon='back' title='Calendário' rightIcon='menu' onClickLeftIcon={() => router.push('/')} onClickRightIcon={() => setMenuOpened(!menuOpened)} />
        <Sidebar menuOpened={menuOpened} onClose={() => setMenuOpened(false)} />
      </div>

    </>
  )
}


export default Calendar;
