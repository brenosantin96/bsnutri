import styles from './styles.module.css'
import Image from 'next/image'
import image1 from '../../public/food1.png';

type Props = {
    light?: boolean
}


export const FoodComponent = ({light} : Props) => {


    return (
        <div className={styles.container}>
            <div className={styles.headerFoodContainer}>
                <div className={styles.headerName}>Huevo</div>
                <div className={styles.headerPortion}>65g</div>
            </div>
            <div className={styles.foodContainer} style={{backgroundColor: light ? '#FAA846' : '#FA881E', border: light ? '2px solid #FA881E' : '2px solid #FAA846'}}>
                <div className={styles.leftSideFoodContainer}>
                    <div className={styles.spaceImage}>
                        <Image src={image1} alt="Food1" width={64} height={60} />
                    </div>
                </div>
                <div className={styles.rightSideFoodContainer}>
                    <div className={styles.infoItem}>
                        <div className={styles.descriptionItem}>Proteína:</div>
                        <div className={styles.valueItem}>13g</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.descriptionItem}>Kcal:</div>
                        <div className={styles.valueItem}>200kcal</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.descriptionItem}>Grasa:</div>
                        <div className={styles.valueItem}>3g</div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.descriptionItem}>Sal:</div>
                        <div className={styles.valueItem}>1g</div>
                    </div>

                </div>
            </div>
        </div>
    )
}