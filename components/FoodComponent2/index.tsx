import styles from './styles.module.css'
import Image from 'next/image'
import image1 from '../../public/food1.png';
import { Food } from '@/types/Food';
import Link from 'next/link'
import { useState } from 'react';
import { InputSecondary } from '../InputSecondary';

type Props = {
    data: Food;
    light?: boolean;
    isEdditing?: boolean;
}


export const FoodComponent2 = ({ data, light, isEdditing }: Props) => {



    //inputs
    const [inputProteinValue, setInputProteinValue] = useState(data.protein.toString());
    const [inputKcalValue, setInputKcalValue] = useState(data.calories.toString());
    const [inputGreaseValue, setInputGreaseValue] = useState(data.grease.toString());
    const [inputSaltValue, setInputSaltValue] = useState(data.salt.toString());





    return (
        <div className={styles.container}>
            <div className={styles.headerFoodContainer}>
                <div className={styles.headerName}>{data.name}</div>
                <div className={styles.headerPortion}>{`${data.portion}g`}</div>
            </div>

            <Link legacyBehavior href={`/foods/${data.id}`}>
                <div className={styles.foodContainer} style={{ backgroundColor: light ? '#FAA846' : '#FA881E', border: light ? '2px solid #FA881E' : '2px solid #FAA846' }}>
                    <div className={styles.topSideFoodContainer}>
                        <div className={styles.spaceImage}>
                            <Image src={data.image as string} alt="Food1" width={64} height={60} />
                        </div>
                    </div>
                    <div className={styles.downSideContainer}>
                        <div className={styles.infoItem}>
                            <InputSecondary disabled={true} type={'text'} value={"Proteína"} onlyText />
                            <InputSecondary disabled={!isEdditing as boolean} type={'number'} value={isEdditing ? inputProteinValue : data.protein.toString()} onChange={setInputProteinValue} />
                        </div>
                        <div className={styles.infoItem}>
                            <InputSecondary disabled={true} type={'text'} value={"Kcal"}  onlyText/>
                            <InputSecondary disabled={!isEdditing as boolean} type={'number'} value={isEdditing ? inputKcalValue : data.calories.toString()} onChange={setInputKcalValue} />
                        </div>
                        <div className={styles.infoItem}>
                            <InputSecondary disabled={true} type={'text'} value={"Grasa"} onlyText />
                            <InputSecondary disabled={!isEdditing as boolean} type={'number'} value={isEdditing ? inputGreaseValue : data.grease.toString()} onChange={setInputGreaseValue} />
                        </div>
                        <div className={styles.infoItem}>
                            <InputSecondary disabled={true} type={'text'} value={"Sal"} onlyText />
                            <InputSecondary disabled={!isEdditing as boolean} type={'number'} value={isEdditing ? inputSaltValue : data.salt.toString()} onChange={setInputSaltValue} />
                        </div>

                    </div>
                </div>
            </Link>
        </div>
    )
}