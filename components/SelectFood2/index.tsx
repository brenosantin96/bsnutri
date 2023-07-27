import { useApi } from '@/libs/useApi';
import { Food } from '@/types/Food';
import { GetServerSideProps } from 'next';
import { Icon } from '../Icon';
import styles from './styles.module.css'

type Props = {
    textLabel: string;
    foods: Food[];
    handleSelectedFood: (id: number) => void;
    disabled?: boolean;
    onPlus: () => void;
}

const SelectFood2 = ({ textLabel, foods, handleSelectedFood, onPlus, disabled }: Props) => {


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const selectedId = parseInt(event.target.value);
        handleSelectedFood(selectedId);

    };

    return (
        <>
            <label className={styles.textLabel} htmlFor='foods'>{textLabel}</label>
            <div className={styles.container}>

                <div className={styles.selectArea}>
                    <select className={styles.selectArea} name="foods" id="food-select" disabled={!disabled} onChange={handleChange}>
                        <option value="">Seleccione un item</option>
                        {foods.map((food) => (
                            <option key={food.id} value={food.id}>
                                {food.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.addArea} onClick={onPlus}
                    style={{
                        pointerEvents: !disabled ? 'none' : 'all',
                        opacity: !disabled ? '0.4' : 'initial'
                    }}
                >
                    <Icon svg='plus' width={27} height={27} />
                </div>

            </div>
        </>
    )
}

export default SelectFood2;

