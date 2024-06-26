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
    onMinusHandle?: (idFood: number) => void
    link?: boolean;
    disabled?: boolean;
}


export const FoodComponent = ({ data, light, url, minusButton, link, disabled, onMinusHandle }: Props) => {


    const handleOnMinus = (foodId: number) => {

        if(onMinusHandle){
            const selectedId = foodId;
            onMinusHandle(selectedId);
        }

    };

    return (
        <div className={styles.container}>
            <div className={styles.headerFoodContainer}>
                <div className={styles.headerName}>{data.name ? data.name : ""}</div>
                <div className={styles.headerPortion}>{data.portion ? data.portion : 1}</div>
            </div>

            <div className={styles.foodArea}>
                <div className={styles.foodContainer} style={{ backgroundColor: light ? '#FAA846' : '#FA881E', border: light ? '2px solid #FA881E' : '2px solid #FAA846' }}>
                    {link === true &&
                        <Link legacyBehavior href={`/${url}/${data.id}`}>
                            <div className={styles.boxFoodContainer}>
                                <div className={styles.leftSideFoodContainer}>
                                    <div className={styles.spaceImage}>
                                        <Image src={data.image ? data.image as string : '/default.png'} alt="Food1" width={64} height={60} />
                                    </div>
                                </div>
                                <div className={styles.rightSideFoodContainer}>
                                    <div className={styles.infoItem}>
                                        <div className={styles.descriptionItem}>Proteína:</div>
                                        <div className={styles.valueItem}>{data.protein ? data.protein : 0}</div>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <div className={styles.descriptionItem}>Kcal:</div>
                                        <div className={styles.valueItem}>{data.calories ? data.calories : 0}</div>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <div className={styles.descriptionItem}>Grasa:</div>
                                        <div className={styles.valueItem}>{data.grease ? data.grease : 0}</div>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <div className={styles.descriptionItem}>Sal:</div>
                                        <div className={styles.valueItem}>{data.salt ? data.salt : 0}</div>
                                    </div>

                                </div>
                            </div>
                        </Link>
                    }

                    {link === false &&
                        <>
                            <div className={styles.leftSideFoodContainer}>
                                <div className={styles.spaceImage}>
                                    <Image src={data.image ? data.image as string : '/default.png'} alt="Food1" width={64} height={60} />
                                </div>
                            </div>
                            <div className={styles.rightSideFoodContainer}>
                                <div className={styles.infoItem}>
                                    <div className={styles.descriptionItem}>Proteína:</div>
                                    <div className={styles.valueItem}>{data.protein ? data.protein : 0}</div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.descriptionItem}>Kcal:</div>
                                    <div className={styles.valueItem}>{data.calories ? data.calories : 0}</div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.descriptionItem}>Grasa:</div>
                                    <div className={styles.valueItem}>{data.grease ? data.grease : 0}</div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.descriptionItem}>Sal:</div>
                                    <div className={styles.valueItem}>{data.salt ? data.salt : 0}</div>
                                </div>

                            </div>
                        </>
                    }
                </div>

                {minusButton &&
                    <div className={styles.minusButtonArea}
                        style={{
                            pointerEvents: disabled ? 'none' : 'all',
                            opacity: disabled ? '0.4' : 'initial'
                        }}
                        onClick={() => handleOnMinus(data.id)}
                    >
                        <Icon svg='minus' height={27} width={27} />
                    </div>
                }


            </div>

        </div>
    )
}