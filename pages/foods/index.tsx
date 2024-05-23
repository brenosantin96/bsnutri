import { ButtonMain } from '@/components/ButtonMain';
import { Header } from '@/components/Header';
import Head from 'next/head'
import { useRouter } from 'next/router';
import styles from '../../styles/Foods.module.css'
import { FoodComponent } from '@/components/FoodComponent';
import { SearchInput } from '../../components/searchInput';
import { Icon } from '@/components/Icon';
import { GetServerSideProps } from 'next';
import { useApi } from '@/libs/useApi';
import { Food } from '@/types/Food';
import { useEffect, useState } from 'react';


const FoodsPage = () => {


    const api = useApi();
    const router = useRouter();

    const [foods, setFoods] = useState<Food[]>();

    useEffect(() => {
        getFoods();
    }, [])

    

    const getFoods = async () => {
        const foods = await api.getFoods();
        setFoods(foods);
    }


    //SearchArea
    const [searchText, setSearchText] = useState("");
    const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);

    useEffect(() => {
        let newFilteredFoods: Food[] = [];

        if (foods) {
            for (let food of foods) {
                if (food.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
                    newFilteredFoods.push(food);
                }
            }
            setFilteredFoods(newFilteredFoods);
        }
    }, [searchText])

    const handleSearchText = (value: string) => {
        setSearchText(value)
    }

    const createNewFood = () => {
        router.push('/foods/new')
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
                        <ButtonMain textButton='Cadastrar' onClick={createNewFood} fill={false} disabled={false} />
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
                                    <FoodComponent key={index} data={item} light={index % 2 === 0} url={"foods"} link={true} />
                                ))}
                            </div>
                        }

                        {filteredFoods.length === 0 &&
                            <div>Lo siento, no hay alimentos con este nombre.</div>
                        }

                    </div>
                }


                {!searchText && foods &&
                    <div className={styles.foodArea}>
                        {foods.map((item, index) => (
                            <FoodComponent key={index} data={item} light={index % 2 === 0} url={"foods"} link={true} />
                        ))}
                    </div>
                }

            </div>

        </>
    )
}


export default FoodsPage;


{/* <div className={styles.paginationArea}>
    <Icon svg='leftArrow' height={40} width={40} />
    <Icon svg='rightArrow' height={40} width={40} />
</div>
 */}