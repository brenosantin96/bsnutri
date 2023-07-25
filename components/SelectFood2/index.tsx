import { useApi } from '@/libs/useApi';
import { Food } from '@/types/Food';
import { GetServerSideProps } from 'next';
import { Icon } from '../Icon';
import styles from './styles.module.css'

type Props = {
    textLabel: string;
    foods: Food[];
}

const SelectFood2 = ({ textLabel, foods }: Props) => {




    return (
        <>
            <label className={styles.textLabel} htmlFor='foods'>{textLabel}</label>
            <div className={styles.container}>

                <div className={styles.selectArea}>
                    <select className={styles.selectArea} name="foods" id="food-select">
                        <option value="">Seleccione un item</option>
                        {foods.map((food) => (
                            <option key={food.id} value={food.id}>
                                {food.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.addArea}>
                    <Icon svg='plus' width={27} height={27} />
                </div>

            </div>
        </>
    )
}

export default SelectFood2;

