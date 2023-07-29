import styles from './styles.module.css'

type Props = {
    portionValue: number;
    proteinValue: number;
    caloriesValue: number;
    greaseValue: number;
    saltValue: number;

}

export const InfoDayNutritional = ({ portionValue, proteinValue, caloriesValue, greaseValue, saltValue }: Props) => {

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {`Información Nutricional del dia`}
            </div>
            <div className={styles.downArea}>
                <div className={styles.itemDownArea}>
                    <div className={styles.itemDescription}>Ración</div>
                    <div className={styles.itemValue}>{`${portionValue}g`}</div>
                </div>
                <div className={styles.itemDownArea}>
                    <div className={styles.itemDescription}>Calorias</div>
                    <div className={styles.itemValue}>{`${caloriesValue}kcal`}</div>
                </div>
                <div className={styles.itemDownArea}>
                    <div className={styles.itemDescription}>Proteínas</div>
                    <div className={styles.itemValue}>{`${proteinValue}g`}</div>
                </div>
                <div className={styles.itemDownArea}>
                    <div className={styles.itemDescription}>Grasa</div>
                    <div className={styles.itemValue}>{`${greaseValue}g`}</div>
                </div>
                <div className={styles.itemDownArea}>
                    <div className={styles.itemDescription}>Sal</div>
                    <div className={styles.itemValue}>{`${saltValue}g`}</div>
                </div>
            </div>
        </div>
    )

}