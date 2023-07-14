import { ButtonMain } from '@/components/ButtonMain';
import { ButtonWithIcon } from '../components/ButtonWithIcon'
import { Header } from '@/components/Header';
import Head from 'next/head'
import { useRouter } from 'next/router';
import styles from '../styles/Foods.module.css'
import { FoodComponent } from '@/components/FoodComponent';
import { SearchInput } from '../components/searchInput';
import { Icon } from '@/components/Icon';
import { GetServerSideProps } from 'next';
import { useApi } from '@/libs/useApi';
import { Food } from '@/types/Food';
import { useEffect, useState } from 'react';


const FoodsPage = (data: ServerProps) => {


    const router = useRouter();

    const [foods, setFoods] = useState<Food[]>(data.foods);


    //SearchArea
    const [searchText, setSearchText] = useState("");
    const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);

    useEffect(() => {
        let newFilteredFoods: Food[] = [];

        for (let food of data.foods) {
            if (food.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
                newFilteredFoods.push(food);
            }
        }
        setFilteredFoods(newFilteredFoods);
    }, [searchText])

    const handleSearchText = (value: string) => {
        setSearchText(value)
    }


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
                        {/* <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)}/> */}
                        {/* Como foi criado um componente personalizado, criamos uma funcao, como se fosse um onChange padrao do input */}
                        <SearchInput onSearch={handleSearchText} icon={"lupa"} />
                    </div>
                </div>

                {searchText &&

                    <div className={styles.foodArea}>
                        {filteredFoods.length > 0 &&
                            <div>
                                {filteredFoods.map((item, index) => (
                                    <FoodComponent key={index} data={item} />
                                ))}
                            </div>
                        }

                        {filteredFoods.length === 0 &&
                            <div>Lo siento, no se tiene productos con este nombre.</div>
                        }

                    </div>
                }


                {!searchText &&
                    <div className={styles.foodArea}>
                        {foods.map((item, index) => (
                            <FoodComponent key={index} data={item} />
                        ))}
                    </div>
                }

                <div className={styles.paginationArea}>
                    <Icon svg='leftArrow' height={40} width={40} />
                    <Icon svg='rightArrow' height={40} width={40} />
                </div>
            </div>

        </>
    )
}


export default FoodsPage;


type ServerProps = {
    foods: Food[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const api = useApi();

    //Get products
    const foods = await api.getFoods();


    return {
        props: {
            foods
        }
    }
}