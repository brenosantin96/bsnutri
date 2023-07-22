import { Food } from "@/types/Food";
import { Key } from "react";
import { Icon } from "../Icon";
import styles from "./styles.module.css";

type Props = {
    foods: Food[];
    onChange: (id: number) => void;
    onClick: (keyToExclude: number) => void;
    index: number;
}

export const SelectFood = ({ foods, onChange, onClick, index }: Props) => {
    return (
        <div className={styles.container}>
            <select className={styles.selectFoodArea} onChange={(item) => onChange(parseInt(item.target.value))}>
                <option value="">Seleccione un alimento</option>
                {foods.map((food) => (
                    <option key={food.id} value={food.id}>
                        {food.name}
                    </option>
                ))}
            </select>
            <div className={styles.iconArea} onClick={() => onClick(index)}>
                <Icon svg='minus' height={27} width={27} />
            </div>
        </div>
    )
}