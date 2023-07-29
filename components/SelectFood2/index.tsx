import { Food } from '@/types/Food';
import { Meal } from '@/types/Meal';
import { Icon } from '../Icon';
import styles from './styles.module.css'

type Props = {
    textLabel: string;
    foods: (Food | Meal)[];
    handleSelectedFood: (id: number) => void;
    disabled?: boolean;
    onPlus: () => void;
    isMeal? : boolean
}

const SelectFood2 = ({ textLabel, foods, handleSelectedFood, onPlus, disabled, isMeal }: Props) => {


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const selectedId = parseInt(event.target.value);
        handleSelectedFood(selectedId);

        //const selectedObject = foods.find(item => item.id === selectedId);

        //quero pegar o id e verificar se é um food ou meal atraves da propriedade isMeal

    };

    return (
        <>
            <label className={styles.textLabel} htmlFor='foods'>{textLabel}</label>
            <div className={styles.container}>

                <div className={styles.selectArea}>
                    <select className={styles.selectArea} name="foods" id="food-select" disabled={!disabled} onChange={handleChange}>
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

