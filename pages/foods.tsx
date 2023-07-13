import { ButtonMain } from '@/components/ButtonMain';
import { ButtonWithIcon } from '../components/ButtonWithIcon'
import { Header } from '@/components/Header';
import Head from 'next/head'
import { useRouter } from 'next/router';
import styles from '../styles/Foods.module.css'
import { FoodComponent } from '@/components/FoodComponent';
import { Icon } from '@/components/Icon';


const FoodsPage = () => {


    const router = useRouter();

    return (
        <>
            <Head>
                <title>Alimentos | BSNutri</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header leftIcon='back' title='Alimentos' onClickLeftIcon={() => router.push('/calendar')} />

            <div className={styles.container}>


                <div className={styles.searchArea}>
                    <div className={styles.buttonSearchArea}>
                        <ButtonMain textButton='Cadastrar' onClick={() => { }} fill={false} />
                    </div>
                    <div className={styles.buttonWithIcon}>
                        <ButtonWithIcon icon='lupa' />
                    </div>
                </div>
                <div className={styles.foodArea}>
                    <FoodComponent />
                    <FoodComponent light />
                    <FoodComponent />
                    <FoodComponent light />
                </div>
                <div className={styles.paginationArea}>
                    <Icon svg='leftArrow' height={40} width={40} />
                    <Icon svg='rightArrow' height={40} width={40} />
                </div>
            </div>

        </>
    )
}


export default FoodsPage;
