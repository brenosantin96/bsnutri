import styles from './styles.module.css'
import Image from 'next/image'
import image1 from '../../public/food1.png';
import { Food } from '@/types/Food';
import Link from 'next/link'
import { Meal } from '@/types/Meal';
import { Icon } from '../Icon';

type Props = {
    data: Food | Meal;
    light?: boolean;
    url: 'foods' | 'meals';
    minusButton?: boolean;
    link?: boolean
}


export const FoodComponent = ({ data, light, url, minusButton, link }: Props) => {


    return (
        <div className={styles.container}>
            <div className={styles.headerFoodContainer}>
                <div className={styles.headerName}>{data.name}</div>
                <div className={styles.headerPortion}>{data.portion}</div>
            </div>

            <div className={styles.foodArea}>
                <div className={styles.foodContainer} style={{ backgroundColor: light ? '#FAA846' : '#FA881E', border: light ? '2px solid #FA881E' : '2px solid #FAA846' }}>
                    {link === true&&
                        <Link legacyBehavior href={`/${url}/${data.id}`}>
                            <div className={styles.boxFoodContainer}>
                                <div className={styles.leftSideFoodContainer}>
                                    <div className={styles.spaceImage}>
                                        <Image src={data.image as string} alt="Food1" width={64} height={60} />
                                    </div>
                                </div>
                                <div className={styles.rightSideFoodContainer}>
                                    <div className={styles.infoItem}>
                                        <div className={styles.descriptionItem}>Proteína:</div>
                                        <div className={styles.valueItem}>{data.protein}</div>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <div className={styles.descriptionItem}>Kcal:</div>
                                        <div className={styles.valueItem}>{data.calories}</div>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <div className={styles.descriptionItem}>Grasa:</div>
                                        <div className={styles.valueItem}>{data.grease}</div>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <div className={styles.descriptionItem}>Sal:</div>
                                        <div className={styles.valueItem}>{data.salt}</div>
                                    </div>

                                </div>
                            </div>
                        </Link>
                    }

                    {link === false &&
                        <>
                            <div className={styles.leftSideFoodContainer}>
                                <div className={styles.spaceImage}>
                                    <Image src={data.image as string} alt="Food1" width={64} height={60} />
                                </div>
                            </div>
                            <div className={styles.rightSideFoodContainer}>
                                <div className={styles.infoItem}>
                                    <div className={styles.descriptionItem}>Proteína:</div>
                                    <div className={styles.valueItem}>{data.protein}</div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.descriptionItem}>Kcal:</div>
                                    <div className={styles.valueItem}>{data.calories}</div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.descriptionItem}>Grasa:</div>
                                    <div className={styles.valueItem}>{data.grease}</div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.descriptionItem}>Sal:</div>
                                    <div className={styles.valueItem}>{data.salt}</div>
                                </div>

                            </div>
                        </>
                    }
                </div>

                {minusButton &&
                    <div className={styles.minusButtonArea}>
                        <Icon svg='minus' height={27} width={27} />
                    </div>
                }


            </div>

        </div>
    )
}