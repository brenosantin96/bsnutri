import { Header } from '@/components/Header';
import Head from 'next/head'
import { useRouter } from 'next/router';
import styles from '../../styles/RegisterMeal.module.css'
import { GetServerSideProps } from 'next';
import { useApi } from '@/libs/useApi';
import { InputMain } from '../../components/InputMain'
import { useState } from 'react';
import { ButtonMain } from '@/components/ButtonMain';
import { Food } from '@/types/Food';
import { Meal } from '@/types/Meal';
import { Icon } from '@/components/Icon';
import { SelectFood } from '@/components/SelectFood';


const RegisterMealPage = (data: ServerProps) => {


    const router = useRouter();
    const api = useApi();

    //inputs
    const [nameInput, setNameInput] = useState("");

    const [foods, setFoods] = useState(data.foods);

    //selects
    const [selectedFoodId, setSelectedFoodId] = useState<number | null>(null);
    const [selectComponents, setSelectComponents] = useState<JSX.Element[]>([]);



    const handleSaveMeal = () => {
        //api.createMeal(newMeal);
    }

    const addSelectFoodComponent = () => {
        setSelectComponents([...selectComponents,
        <SelectFood
            index={selectComponents.length}
            key={selectComponents.length}
            foods={foods}
            onChange={handleSelectedItem}
            onClick={handleOnClickMinus}
        />])
    }

    const handleSelectedItem = (id: number) => {
        setSelectedFoodId(id);
        console.log("Select tem selecionado: ", selectedFoodId)
    }

    const handleOnClickMinus = (index: number) => {
        const updatedSelectComponents = [...selectComponents];
        updatedSelectComponents.splice(index, 1); // Remove o componente pelo índice

        setSelectComponents(updatedSelectComponents);
    }

    return (
        <>
            <Head>
                <title>Alimentos | BSNutri</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header leftIcon='back' title='Nuevo Plato' onClickLeftIcon={() => router.push('/meals')} />

            <div className={styles.container}>
                <div className={styles.formRegisterArea}>
                    <div className={styles.nameArea}>
                        <div className={styles.inputArea}>
                            <InputMain typeInput='text'
                                name='name'
                                fontSizeLabel={12}
                                textLabel="Nombre"
                                onChange={(e) => (setNameInput(e))}

                            />
                        </div>
                        <div className={styles.iconArea} onClick={addSelectFoodComponent}>
                            <Icon svg='plus' height={27} width={27} />
                        </div>
                    </div>
                    <div className={styles.foodsArea}>
                        {selectComponents.map(
                            (selectComponent, index) => <SelectFood
                                key={index}
                                foods={foods}
                                index={index}
                                onChange={handleSelectedItem}
                                onClick={handleOnClickMinus}
                            />
                        )}
                    </div>
                </div>

                <div className={styles.buttonsRegisterArea}>
                    <ButtonMain onClick={() => { }} textButton={"Volver"} fill={false} />
                    <ButtonMain onClick={handleSaveMeal} textButton={"Guardar"} fill={true} />
                </div>
            </div>

        </>
    )
}


export default RegisterMealPage;


type ServerProps = {
    foods: Food[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const api = useApi();

    //get Foods to populate fields
    const foods = await api.getFoods();


    return {
        props: {
            foods
        }
    }
}
