import { FoodComponent2 } from '@/components/FoodComponent2';
import { Header } from '@/components/Header';
import { ButtonMain } from '@/components/ButtonMain';
import { useApi } from '@/libs/useApi';
import { Food } from '@/types/Food';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styles from '../../styles/Food-id.module.css';
import { useState } from 'react';
import { ModalExclude } from '@/components/ModalExclude';


const FoodId = (data: ServerProps) => {

    const router = useRouter();
    const api = useApi();

    const [isEdditing, setIsEdditing] = useState(false);
    const [cancelled, setIsCancelled] = useState(true);
    const [saved, setIsSaved] = useState(false);
    const [removing, setRemoving] = useState(false);

    const [food, setFood] = useState<Food>(data.food)

    //removeItem Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const startEdditing = () => {
        setIsEdditing(true);
        setIsCancelled(false);
        setIsSaved(false);
    }


    const saveEdittedFood = () => {
        console.log("Salvado o food: ", food)
        setIsSaved(true);

    }

    const handleUpdateFood = (updatedFood: Food) => {
        // Atualiza o estado do alimento com os novos dados vindo do componente filho.
        setFood(updatedFood);
        console.log(updatedFood);
    };

    const removeFood = () => {
        setRemoving(true);
    }


    const cancelSave = () => {
        setIsEdditing(false)
        setIsCancelled(true);
        setIsSaved(false);
    }

    //quando eu clicar no salvar do componente pai, vai pegar todos dados do componente FoodComponent2 e vai mandar na APi
    //do foodcomponent2 eu tenho que enviar um food com os valores atualizados aqui para o componente pai.
    //no child vamo mandar uma funcao que manda o estado do parent component


    return (
        <>
            <Header title={data.food.name} leftIcon='back' onClickLeftIcon={() => router.push('/foods')} />
            <div className={styles.container}>

                <div className={styles.areaEditButton}>
                    <ButtonMain onClick={startEdditing} textButton={"Editar"} fill={false} />
                    <ButtonMain onClick={removeFood} textButton={"Remover"} fill={false} />
                </div>
                <FoodComponent2 light={true} data={data.food} isEdditing={isEdditing} cancelled={cancelled} saved={saved} onSave={handleUpdateFood} />

                {removing &&
                    <ModalExclude id={food.id} valueToRemove={food.name} />
                }


                <div className={styles.backAndSaveArea}>
                    <ButtonMain onClick={cancelSave} textButton={"Cancelar"} fill={false} />
                    <ButtonMain onClick={saveEdittedFood} textButton={"Guardar"} fill={true} />
                </div>
            </div>
        </>
    )
}

export default FoodId;

type ServerProps = {
    food: Food;
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    // Extrair o ID da URL usando o objeto context
    const { id } = context.query;

    const api = useApi();

    //Get products
    const food = await api.getOneFood(parseInt(id as string));


    return {
        props: {
            food
        }
    }
}