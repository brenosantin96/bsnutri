import { useApi } from "@/libs/useApi";
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
    handleSummedPortion: (portionValue: number, operation: 'plus' | 'minus') => void;
    handleSummedProtein: (proteinValue: number, operation: 'plus' | 'minus') => void;
    handleSummedCalories: (caloriesValue: number, operation: 'plus' | 'minus') => void;
    handleSummedGrease: (greaseValue: number, operation: 'plus' | 'minus') => void;
    handleSummedSalt: (saltValue: number, operation: 'plus' | 'minus') => void;
}

export const SelectFood = ({ foods, onChange, onClick, index, selectedFoodsId, deleteSelectedItem, handleSummedPortion, handleSummedProtein, handleSummedCalories, handleSummedGrease, handleSummedSalt }: Props) => {

    const [selectedFoodName, setSelectedFoodName] = useState("");
    const [foodsClone, setFoodsClone] = useState<Food[]>()
    const api = useApi();

    useEffect(() => {
        getCloneFoods();
    }, [])

    const getCloneFoods = async () => {
        let clone = await api.getFoods();
        setFoodsClone(clone);
    }

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

        if (selectedFood) {
            handleSummedPortion(selectedFood.portion, 'plus');
            handleSummedProtein(selectedFood.protein, 'plus');
            handleSummedCalories(selectedFood.calories, 'plus');
            handleSummedGrease(selectedFood.grease, 'plus');
            handleSummedSalt(selectedFood.salt, 'plus');
        }

    };

    const handleMinusFunction = (idFood: number) => {

        //tive que criar uma variavel foodsClone para conseguir achar justo o elemento que necessita eliminar
        if (foodsClone) {
            const selectedFood = foodsClone.find((food) => food.id === idFood);


            if (selectedFood) {
                console.log("entrou no if, selectedFood é", selectedFood);
                handleSummedPortion(selectedFood.portion, 'minus');
                handleSummedProtein(selectedFood.protein, 'minus');
                handleSummedCalories(selectedFood.calories, 'minus');
                handleSummedGrease(selectedFood.grease, 'minus');
                handleSummedSalt(selectedFood.salt, 'minus');
            }
        }
    }




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
                handleMinusFunction(selectedFoodsId[index]);
                handleOnClick();
                handleDeleteSelectedItem();
            }}>
                <Icon svg='minus' height={27} width={27} />
            </div>
        </div>
    )
}
