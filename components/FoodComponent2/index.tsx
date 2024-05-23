import styles from './styles.module.css'
import Image from 'next/image'
import image1 from '../../public/food1.png';
import { Food } from '@/types/Food';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { InputSecondary } from '../InputSecondary';

type Props = {
    data: Food;
    isEdditing: boolean;
    light?: boolean;
    cancelled: boolean;
    saved: boolean;
    onSave: (food: Food) => void
}


export const FoodComponent2 = ({ data, light, isEdditing, cancelled, saved, onSave }: Props) => {




    //inputs
    const [inputProteinValue, setInputProteinValue] = useState(data.protein.toString());
    const [inputKcalValue, setInputKcalValue] = useState(data.calories.toString());
    const [inputGreaseValue, setInputGreaseValue] = useState(data.grease.toString());
    const [inputSaltValue, setInputSaltValue] = useState(data.salt.toString());

    const handleIsCancelled = () => {
        //recebendo do componente pai se a operacao foi cancelada ou nao atraves do cancelled.
        //sempre executando a funcao se esta cancelada atraves do useEffect.

        if (cancelled) {
            setInputProteinValue(data.protein.toString());
            setInputKcalValue(data.calories.toString());
            setInputGreaseValue(data.grease.toString());
            setInputSaltValue(data.salt.toString());
            console.log("Cancelled: ", cancelled)
        } else {
            console.log("Cancelled: ", cancelled)
        }

    }

    const handleIsSaved = () => {
        if (saved) {
            let food: Food = {
                id: data.id,
                name: data.name,
                portion: data.portion,
                protein: parseFloat(inputProteinValue),
                calories: parseFloat(inputKcalValue),
                grease: parseFloat(inputGreaseValue),
                salt: parseFloat(inputSaltValue),
            }
            onSave(food);
        }
    }

    useEffect(() => {
        handleIsCancelled()
    }, [cancelled])

    useEffect(() => {
        handleIsSaved()
    }, [saved, inputProteinValue, inputKcalValue, inputGreaseValue, inputSaltValue])

    return (
        <div className={styles.container}>
            {isEdditing &&
                <div className={styles.headerFoodContainer}>
                    <div className={styles.headerName}>{data.name}</div>
                    <div className={styles.headerPortion}>{`${data.portion}g`}</div>
                </div>
            }

            <Link legacyBehavior href={`/foods/${data.id}`}>
                <div className={styles.foodContainer} style={{ backgroundColor: light ? '#FAA846' : '#FA881E', border: light ? '2px solid #FA881E' : '2px solid #FAA846' }}>
                    <div className={styles.topSideFoodContainer}>
                        <div className={styles.spaceImage}>
                            <Image src={data.image ? data.image : "/default.png"} alt="Food1" width={64} height={60} />
                        </div>
                    </div>
                    <div className={styles.downSideContainer}>
                        <div className={styles.infoItem}>
                            <InputSecondary disabled={false} type={'text'} value={"Proteína"} onlyText />
                            <InputSecondary
                                disabled={!isEdditing as boolean}
                                type={'number'}
                                value={isEdditing ? inputProteinValue : data.protein.toString()}
                                onChange={setInputProteinValue}
                            />

                        </div>
                        <div className={styles.infoItem}>
                            <InputSecondary disabled={false} type={'text'} value={"Kcal"} onlyText />
                            <InputSecondary
                                disabled={!isEdditing as boolean}
                                type={'number'}
                                value={isEdditing ? inputKcalValue : data.calories.toString()}
                                onChange={setInputKcalValue}
                            />
                        </div>
                        <div className={styles.infoItem}>
                            <InputSecondary disabled={false} type={'text'} value={"Grasa"} onlyText />
                            <InputSecondary
                                disabled={!isEdditing as boolean}
                                type={'number'}
                                value={isEdditing ? inputGreaseValue : data.grease.toString()}
                                onChange={setInputGreaseValue}
                            />
                        </div>
                        <div className={styles.infoItem}>
                            <InputSecondary disabled={false} type={'text'} value={"Sal"} onlyText />
                            <InputSecondary
                                disabled={!isEdditing as boolean}
                                type={'number'}
                                value={isEdditing ? inputSaltValue : data.salt.toString()}
                                onChange={setInputSaltValue} />
                        </div>

                    </div>
                </div>
            </Link>
        </div>
    )
}