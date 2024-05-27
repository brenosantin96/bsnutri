import { Header } from '@/components/Header';
import Head from 'next/head'
import { useRouter } from 'next/router';
import styles from '../../styles/RegisterFood.module.css'
import { GetServerSideProps } from 'next';
import { useApi } from '@/libs/useApi';
import { InputMain } from '../../components/InputMain'
import { useState } from 'react';
import { ButtonMain } from '@/components/ButtonMain';
import { Food } from '@/types/Food';


const RegisterFoodPage = () => {


    const router = useRouter();
    const api = useApi();

    //inputs
    const [nameInput, setNameInput] = useState("");
    const [portionInput, setPortionInput] = useState("");
    const [proteinInput, setProteinInput] = useState("");
    const [caloriesInput, setCaloriesInput] = useState("");
    const [greaseInput, setGreaseInput] = useState("");
    const [saltInput, setSaltInput] = useState("");

    //error
    const [error, setError] = useState<string | null>(null);

    
    const handleSaveFood = async () => {
        let newFood : Food = {
            id: 1,
            name: nameInput,
            portion: parseInt(portionInput),
            protein: parseInt(proteinInput),
            calories: parseInt(caloriesInput),
            grease: parseInt(greaseInput),
            salt: parseInt(saltInput)
        };

        try {
            let result = await api.createFood(newFood.name, newFood.portion, newFood.protein, newFood.calories, newFood.grease, newFood.salt);
            console.log(result);
            router.push("/foods");
        } catch (error: any) {
            alert(error.message)
        };
    }


    return (
        <>
            <Head>
                <title>Alimentos | BSNutri</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header leftIcon='back' title='Nuevo Alimento' onClickLeftIcon={() => router.push('/foods')} />


            <div className={styles.container}>
                <div className={styles.formRegisterArea}>
                    <InputMain typeInput='text'
                        name='name'
                        fontSizeLabel={12}
                        textLabel="Nombre"
                        onChange={(e) => (setNameInput(e))}
                        
                    />
                </div>
                <div className={styles.formRegisterArea}>
                    <InputMain typeInput='number'
                        name='name'
                        fontSizeLabel={12}
                        textLabel="Ración (gramas)"
                        onChange={(e) => (setPortionInput(e))}
                        
                    />
                </div>
                <div className={styles.formRegisterArea}>
                    <InputMain typeInput='number'
                        name='name'
                        fontSizeLabel={12}
                        textLabel="Proteínas (gramas)"
                        onChange={(e) => (setProteinInput(e))}
                        
                    />
                </div>
                <div className={styles.formRegisterArea}>
                    <InputMain typeInput='number'
                        name='name'
                        fontSizeLabel={12}
                        textLabel="Calroias (Kcal)"
                        onChange={(e) => (setCaloriesInput(e))}
                        
                    />
                </div>
                <div className={styles.formRegisterArea}>
                    <InputMain typeInput='number'
                        name='name'
                        fontSizeLabel={12}
                        textLabel="Grasa (gramas)"
                        onChange={(e) => (setGreaseInput(e))}
                        
                    />
                </div>
                <div className={styles.formRegisterArea}>
                    <InputMain typeInput='number'
                        name='name'
                        fontSizeLabel={12}
                        textLabel="Sal (gramas)"
                        onChange={(e) => (setSaltInput(e))}
                        
                    />
                </div>
                <div className={styles.buttonsRegisterArea}>
                        <ButtonMain onClick={() => {}} textButton={"Volver"} fill={false} disabled={false} />
                        <ButtonMain onClick={handleSaveFood} textButton={"Guardar"} fill={true} disabled={false} />
                </div>
            </div>

        </>
    )
}


export default RegisterFoodPage;


