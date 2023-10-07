import { Food } from '@/types/Food';
import { Meal } from '@/types/Meal';
import { useEffect } from 'react';
import { Icon } from '../Icon';
import styles from './styles.module.css';

type Props = {
    foods: (Food | Meal)[];
    onHandle: (selectedIndex: number) => void;
    disabled: boolean;
}

export const ComponentsSelected = ({ foods, onHandle, disabled }: Props) => {

    const itemQuantities: Record<string, number> = foods.reduce((quantities, item) => {
        if (item.name in quantities) {
            quantities[item.name]++;
        } else {
            quantities[item.name] = 1;
        }
        return quantities;
    }, {} as Record<string, number>); // Tipo inicial explícito aqui


    // Criar um array de itens únicos
    const uniqueItems = Array.from(new Set(foods.map(item => item.name)));


    const onHandleMinusFunction = (selectedIndex: number) => {
        onHandle(selectedIndex);
    }

    useEffect(() => {
        console.log('teste');
    }, [foods])


    return (
        <div className={styles.container}
            style={{
                pointerEvents: !disabled ? 'none' : 'all',
                opacity: !disabled ? '0.4' : 'initial'
            }}>
            {uniqueItems.map((item, index) =>
                <div className={styles.item} key={index}>
                    <div className={styles.itemName}>
                        {item}
                    </div>
                    <div className={styles.minusIcon} onClick={() => onHandleMinusFunction(index)}>
                        <div className={styles.qtMinusIcon}> ({itemQuantities[item]}x) </div>
                        <Icon svg='minus2' width={24} height={24} />
                    </div>
                </div>
            )}
        </div>
    )
}