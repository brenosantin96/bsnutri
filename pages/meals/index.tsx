import { ButtonMain } from '@/components/ButtonMain';
import { Header } from '@/components/Header';
import Head from 'next/head'
import { useRouter } from 'next/router';
import styles from '../../styles/Meals.module.css'
import { FoodComponent } from '@/components/FoodComponent';
import { SearchInput } from '../../components/searchInput';
import { Icon } from '@/components/Icon';
import { GetServerSideProps } from 'next';
import { useApi } from '@/libs/useApi';
import { Food } from '@/types/Food';
import { useEffect, useState } from 'react';
import { Meal } from '@/types/Meal';


const MealsPage = () => {

    const api = useApi();
    const router = useRouter();

    const [meals, setMeals] = useState<Meal[]>()

    useEffect(() => {

        getMeals();

    }, [])

    const getMeals = async () => {
        const meals = await api.getMeals();
        setMeals(meals);
    }


    //SearchArea
    const [searchText, setSearchText] = useState("");
    const [filteredMeals, setFilteredMeals] = useState<Food[]>([]);

    useEffect(() => {
        let newFilteredMeals: Meal[] = [];

        if (meals) {
            for (let meal of meals) {
                if (meal.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
                    newFilteredMeals.push(meal);
                }
            }
            setFilteredMeals(newFilteredMeals);
        }

    }, [searchText])

    const handleSearchText = (value: string) => {
        setSearchText(value)
    }

    const createNewMeal = () => {
        router.push('/meals/new')
    }


    return (
        <>
            <Head>
                <title>Comidas | BSNutri</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header leftIcon='back' title='Platos Elaborados' onClickLeftIcon={() => router.push('/calendar')} />

            <div className={styles.container}>


                <div className={styles.searchArea}>
                    <div className={styles.buttonSearchArea}>
                        <ButtonMain textButton='Cadastrar' onClick={createNewMeal} fill={false} disabled={false} />
                    </div>
                    <div className={styles.buttonWithIcon}>
                        {/* <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)}/> */}
                        {/* Como foi criado um componente personalizado, criamos uma funcao, como se fosse um onChange padrao do input */}
                        <SearchInput onSearch={handleSearchText} icon={"lupa"} />
                    </div>
                </div>

                {searchText &&

                    <div className={styles.foodArea}>
                        {filteredMeals.length > 0 &&
                            <div>
                                {filteredMeals.map((item, index) => (
                                    <FoodComponent key={index} data={item} light={index % 2 === 0} url={"meals"} link={true} />
                                ))}
                            </div>
                        }

                        {filteredMeals.length === 0 &&
                            <div>Lo siento, no hay alimentos con este nombre.</div>
                        }

                    </div>
                }


                {!searchText && meals &&
                    <div className={styles.foodArea}>
                        {meals.map((item, index) => (
                            <FoodComponent key={index} data={item} light={index % 2 === 0} url={"meals"} link={true} />
                        ))}
                    </div>
                }


            </div>

        </>
    )
}


export default MealsPage;

{/* <div className={styles.paginationArea}>
    <Icon svg='leftArrow' height={40} width={40} />
    <Icon svg='rightArrow' height={40} width={40} />
</div> */}


