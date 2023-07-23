import { Food } from "@/types/Food";
import { Key, useEffect, useState } from "react";
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

    const [selectedFoodName, setSelectedFoodName] = useState("");

    const handleOnClick = () => {
        onClick(index);
    }

    const handleDeleteSelectedItem = () => {
        deleteSelectedItem(selectedFoodsId[index]);
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value);
        onChange(selectedId);

        // Atualizar o nome do alimento selecionado quando o valor muda
        const selectedFood = foods.find((food) => food.id === selectedId);
        setSelectedFoodName(selectedFood ? selectedFood.name : "");

    };




    //em selectedFoodsId so tenho o ID dos produtos que foi achado

    return (
        <div className={styles.container}>
            <select id={index.toString()} className={styles.selectFoodArea} onChange={handleChange} value={selectedFoodsId[index] || ""} disabled={selectedFoodName ? true : false}>
                {selectedFoodName ? (
                    <option value={selectedFoodsId[index]}>{selectedFoodName}</option>
                ) : (
                    <option value="">Seleccione un item</option>
                )}
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

/* <option value="">{selectedFoodsId[index] === undefined ? 'Seleccione un alimento' : foods.find((item) => selectedFoodsId.includes(item.id))?.name}</option> */