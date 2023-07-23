import { Food } from "@/types/Food";
import { Key } from "react";
import { Icon } from "../Icon";
import styles from "./styles.module.css";

type Props = {
    foods: Food[];
    selectedFoodsId: number[];
    onChange: (id: number) => void;
    deleteSelectedItem: (idSelectedItem: number) => void;
    onClick: (keyToExclude: number) => void;
    index: number;
}

export const SelectFood = ({ foods, onChange, onClick, index, selectedFoodsId, deleteSelectedItem }: Props) => {

    const handleOnClick = () => {
        onClick(index);
    }

    const handleDeleteSelectedItem = () => {
        deleteSelectedItem(selectedFoodsId[index]);
    }

    return (
        <div className={styles.container}>
            <select className={styles.selectFoodArea} onChange={(item) => onChange(parseInt(item.target.value))} value={selectedFoodsId[index] || ""}>
                <option value="">{`Seleccione una comida`}</option>
                {foods.map((food) => (
                    <option key={food.id} value={food.id}>
                        {food.name}
                    </option>
                ))}
            </select>
            <div className={styles.iconArea} onClick={() => {
                handleOnClick();
                handleDeleteSelectedItem();
            }}>
                <Icon svg='minus' height={27} width={27} />
            </div>
        </div>
    )
}