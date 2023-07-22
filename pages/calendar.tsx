import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import styles from '../styles/Calendar.module.css'
import { setCookie } from 'cookies-next';
import { AuthContext } from '../contexts/Auth/AuthContext'



const Calendar = () => {

  const [menuOpened, setMenuOpened] = useState(false);

  const auth = useContext(AuthContext);
  const router = useRouter();

  //Managing Cookie

  useEffect(() => {
    //if (auth.token === "") router.push('/')
  }, [])


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
