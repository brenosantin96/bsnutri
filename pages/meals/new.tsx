import { Header } from '@/components/Header';
import Head from 'next/head'
import { useRouter } from 'next/router';
import styles from '../../styles/RegisterMeal.module.css'
import { GetServerSideProps } from 'next';
import { useApi } from '@/libs/useApi';
import { InputMain } from '../../components/InputMain'
import { useEffect, useState } from 'react';
import { ButtonMain } from '@/components/ButtonMain';
import { Food } from '@/types/Food';
import { Meal } from '@/types/Meal';
import { Icon } from '@/components/Icon';
import { SelectFood } from '@/components/SelectFood';
import { sumProperty } from '../../helpers/sumProperty'
import { InfoItemNutritional } from '@/components/InfoItemNutritional';


const RegisterMealPage = (data: ServerProps) => {


    const router = useRouter();
    const api = useApi();

    //inputs
    const [nameInput, setNameInput] = useState("");

    const [foods, setFoods] = useState(data.foods);

    //selects
    const [selectedFoodIds, setSelectedFoodIds] = useState<number[]>([]);
    const [selectComponents, setSelectComponents] = useState<JSX.Element[]>([]);


    //valueSumedProperties
    //no Onchange assim que selecionado, tenho que pegar o valor e atualizar estas variaveis.
    const [summedPortion, setSummedPortion] = useState(0);
    const [summedProtein, setSummedProtein] = useState(0);
    const [summedCalories, setSummedCalories] = useState(0);
    const [summedGrease, setSummedGrease] = useState(0);
    const [summedSalt, setSummedSalt] = useState(0);


    const handleSummedPortion = (value: number, operation: 'plus' | 'minus') => {
        if (operation === 'plus') {
            setSummedPortion(summedPortion + value);
        } else {
            setSummedPortion(summedPortion - value);
        }
    }

    const handleSummedProtein = (value: number, operation: 'plus' | 'minus') => {
        if (operation === 'plus') {
            setSummedProtein(summedProtein + value);
        } else {
            setSummedProtein(summedProtein - value);
        }
    }

    const handleSummedCalories = (value: number, operation: 'plus' | 'minus') => {
        if (operation === 'plus') {
            setSummedCalories(summedCalories + value);
        } else {
            setSummedCalories(summedCalories - value);
        }
    }

    const handleSummedGrease = (value: number, operation: 'plus' | 'minus') => {
        if (operation === 'plus') {
            setSummedGrease(summedGrease + value);
        } else {
            setSummedGrease(summedGrease - value);
        }
    }

    const handleSummedSalt = (value: number, operation: 'plus' | 'minus') => {
        if (operation === 'plus') {
            setSummedSalt(summedSalt + value);
        } else {
            setSummedSalt(summedSalt - value);
        }
    }




    const addSelectFoodComponent = () => {
        setSelectComponents([...selectComponents,
        <SelectFood
            index={selectComponents.length}
            key={selectComponents.length}
            foods={foods}
            onChange={handleSelectedItem}
            onClick={handleOnClickMinus}
            selectedFoodsId={selectedFoodIds}
            deleteSelectedItem={handleDeletedItem}
            handleSummedPortion={handleSummedPortion}
            handleSummedProtein={handleSummedProtein}
            handleSummedCalories={handleSummedCalories}
            handleSummedGrease={handleSummedGrease}
            handleSummedSalt={handleSummedSalt}
        />])
    }

    const handleSelectedItem = (id: number) => {

        //pegando o id do item selecionado e retornando pro nosso state de itens
        setSelectedFoodIds([...selectedFoodIds, id]);
        //removendo valor da opcao ja selecionada.
        setFoods(foods.filter((foodId) => foodId.id !== id));

    }

    const handleDeletedItem = async (id: number) => {
        //ao clicar no -, remover dE selectedFoodIds o ID do item selecionado.
        setSelectedFoodIds(selectedFoodIds.filter((foodId) => foodId !== id))

        //adicionar novamente o elemento eliminado previamente no LIST:
        let food = await api.getOneFood(id);
        if (food) {
            setFoods([...foods, food]);
        }
    }

    const handleOnClickMinus = (index: number) => {
        const updatedSelectComponents = [...selectComponents];
        updatedSelectComponents.splice(index, 1); // Remove o componente pelo índice

        setSelectComponents(updatedSelectComponents);
    }


    const handleSaveMeal = async () => {
        const foodsSelected = await api.getManyFood(selectedFoodIds);

        if (foodsSelected.length === 0) {
            console.log("Selecione pelo menos 1 alimento");
            return;
        }

        if (foodsSelected) {
            let meal: Meal = {
                id: 1,
                name: nameInput,
                portion: sumProperty(foodsSelected, 'portion'),
                protein: sumProperty(foodsSelected, 'protein'),
                calories: sumProperty(foodsSelected, 'calories'),
                grease: sumProperty(foodsSelected, 'grease'),
                salt: sumProperty(foodsSelected, 'salt'),
                foods: foodsSelected
            }
            console.log(meal);
            router.push('/meals')
            //chamada api para salvar a meal
            //let save = await api.createMeal(meal);
            //console.log(save);
        }

    }




    return (
        <>
            <Head>
                <title>Platos | BSNutri</title>
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
                                deleteSelectedItem={handleDeletedItem}
                                selectedFoodsId={selectedFoodIds}
                                handleSummedPortion={handleSummedPortion}
                                handleSummedProtein={handleSummedProtein}
                                handleSummedCalories={handleSummedCalories}
                                handleSummedGrease={handleSummedGrease}
                                handleSummedSalt={handleSummedSalt}
                            />
                        )}
                    </div>
                </div>

                <div className={styles.buttonsRegisterArea}>
                    <ButtonMain onClick={() => router.push('/meals')} textButton={"Volver"} fill={false} disabled={true} />
                    <ButtonMain onClick={handleSaveMeal} textButton={"Guardar"} fill={true} disabled={true} />
                </div>

                <div className={styles.infoItemNutritional}>
                    <InfoItemNutritional
                        foodName={nameInput}
                        portionValue={summedPortion}
                        proteinValue={summedProtein}
                        caloriesValue={summedCalories}
                        greaseValue={summedGrease}
                        saltValue={summedSalt}

                    />
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
