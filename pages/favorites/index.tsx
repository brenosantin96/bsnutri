"use client"
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { useApi2 } from '@/libs/useapi2'
import { InfoNutritionalDay } from '@/types/InfoNutritionalDay'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import styles from '../../styles/Favorites.module.css'
import React, { useState } from 'react'

const FavoritesPage = () => {

  const router = useRouter();

  //Menu
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    //Top 5 alimentos mais comidos no ultimo mes

    <>
      <Header leftIcon='back' title={"Favoritos"} rightIcon='menu' onClickLeftIcon={() => router.back()} onClickRightIcon={() => setMenuOpened(!menuOpened)} />
      <Sidebar menuOpened={menuOpened} onClose={() => setMenuOpened(false)} />
      <div className={styles.container}>
        
      </div>
    </>
  )
}

export default FavoritesPage



type ServerProps = {
  allInfoDayOfUser: InfoNutritionalDay[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const token = context.req.headers.cookie?.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1] || '';

  const api = useApi2(token);

  //Get info Favorites


  return {
    props: {
      //info to be send
    }
  }
}