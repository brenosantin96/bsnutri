import { Food } from '@/types/Food';
import { Meal } from '@/types/Meal';
import { Icon } from '../Icon';
import styles from './styles.module.css';

type Props = {
    foods: (Food | Meal)[];
    onHandle: (selectedIndex : number) => void;
}

export const ComponentsSelected = ({ foods, onHandle }: Props) => {

    const onHandleMinusFunction = (selectedIndex: number) => {
        onHandle(selectedIndex);
    }


    return (
        <div className={styles.container}>
            {foods.map((item, index) =>
                <div className={styles.item} key={index}>
                    <div className={styles.itemName}>
                        {item.name}
                    </div>
                    <div className={styles.minusIcon} onClick={() => onHandleMinusFunction(index)}>
                        <Icon svg='minus2' width={24} height={24} />
                    </div>
                </div>
            )}
        </div>
    )
}