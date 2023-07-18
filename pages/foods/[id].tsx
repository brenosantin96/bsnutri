import { FoodComponent2 } from '@/components/FoodComponent2';
import { useApi } from '@/libs/useApi';
import { Food } from '@/types/Food';
import { GetServerSideProps } from 'next';
import styles from '../../styles/Food-id.module.css';


const FoodId = (data : ServerProps) => {
    return (
        <div className={styles.container}>
            <FoodComponent2 data={data.food} />
        </div>
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