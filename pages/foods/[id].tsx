import { FoodComponent2 } from '@/components/FoodComponent2';
import { Header } from '@/components/Header';
import { ButtonMain } from '@/components/ButtonMain';
import { useApi } from '@/libs/useApi';
import { Food } from '@/types/Food';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styles from '../../styles/Food-id.module.css';
import { useEffect, useState } from 'react';
import { ModalExclude } from '@/components/ModalExclude';


const FoodId = () => {

    const router = useRouter();
    const { id } = router.query;
    const api = useApi();

    const [isEdditing, setIsEdditing] = useState(false);
    const [cancelled, setIsCancelled] = useState(true);
    const [saved, setIsSaved] = useState(false);

    const [food, setFood] = useState<Food>()

    useEffect(() => {
        getFood();
    }, [])

    const getFood = async () => {
        const food = await api.getOneFood(parseInt(id as string));
        setFood(food);
    }


    //removeItem Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const startEdditing = () => {
        setIsEdditing(true);
        setIsCancelled(false);
        setIsSaved(true);
    }


    const saveEdittedFood = async () => {

        if (food) {
            let response = await api.saveEditedFood(food.id, food.portion, food.protein, food.calories, food.grease, food.salt, food.image);
            console.log(response)
            router.push("/foods");
        }

        console.log("Salvado o food: ", food)
        setIsSaved(false);

    }

    const handleUpdateFood = (updatedFood: Food) => {

        // Atualiza o estado do alimento com os novos dados vindo do componente filho.
        setFood(updatedFood);
        
    };

    const removeFood = () => {
        setIsModalOpen(true);
    }

    const handleDeleteFood = async (id: number) => {


        let deletedResponse = await api.deleteFood(id);

        if (deletedResponse.error) {
            console.log(deletedResponse);
            alert("Food is associated with meals. Cannot delete")
        }

        if (deletedResponse.msg === "Food removed with success") {
            router.push('/foods');
        }
        
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
            {food &&
                <Header title={food.name} leftIcon='back' onClickLeftIcon={() => router.push('/foods')} />
            }
            <div className={styles.container}>

                <div className={styles.areaEditButton}>
                    <ButtonMain onClick={startEdditing} textButton={"Editar"} fill={false} disabled={true} />
                    <ButtonMain onClick={removeFood} textButton={"Remover"} fill={false} disabled={true} />
                </div>

                {food &&
                    <FoodComponent2 light={true} data={food} isEdditing={isEdditing} cancelled={cancelled} saved={saved} onSave={handleUpdateFood} />
                }

                {isModalOpen && food &&
                    <div>
                        <ModalExclude id={food.id} valueToRemove={food.name} menuOpened={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)} onDelete={handleDeleteFood} />
                        <div className={styles.backdrop} />
                    </div>
                }


                <div className={styles.backAndSaveArea}>
                    <ButtonMain onClick={cancelSave} textButton={"Cancelar"} fill={false} disabled={true} />
                    <ButtonMain onClick={saveEdittedFood} textButton={"Guardar"} fill={true} disabled={true} />
                </div>
            </div>
        </>
    )
}

export default FoodId;



/* type ServerProps = {
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
} */