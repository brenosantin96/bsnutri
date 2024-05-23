import { Food } from '@/types/Food';
import { Meal } from '@/types/Meal';
import { Icon } from '../Icon';
import styles from './styles.module.css'

type Props = {
    textLabel: string;
    foods: (Food | Meal)[];
    handleSelectedFood: (id: number) => void;
    disableSelect?: boolean;
    onPlus: () => void;
}

const SelectFood2 = ({ textLabel, foods, handleSelectedFood, onPlus, disableSelect }: Props) => {


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const selectedId = parseInt(event.target.value);
        handleSelectedFood(selectedId);

    };

    return (
        <>
            <label className={styles.textLabel} htmlFor='foods'>{textLabel}</label>
            <div className={styles.container}>

                <div className={styles.selectArea}>
                    <select className={styles.selectArea} name="foods" id="food-select" disabled={disableSelect} onChange={handleChange}>
                        <option value="">Seleccione un item</option>
                        {foods.map((food, index) => (
                            <option key={index} value={food.id} >
                                {food.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.addArea} onClick={onPlus}
                    style={{
                        pointerEvents: disableSelect ? 'none' : 'all',
                        opacity: disableSelect ? '0.4' : 'initial'
                    }}
                >
                    <Icon svg='plus' width={27} height={27} color={'#5F4646'} />
                </div>

            </div>
        </>
    )
}

export default SelectFood2;

