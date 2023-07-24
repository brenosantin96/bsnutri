import styles from './styles.module.css'

type Props = {
    foodName: string,
    portionValue: number;
    proteinValue: number;
    caloriesValue: number;
    greaseValue: number;
    saltValue: number;

}

export const InfoItemNutritional = ({ foodName, portionValue, proteinValue, caloriesValue, greaseValue, saltValue }: Props) => {

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {`Información Alimento ${foodName}`}
            </div>
            <div className={styles.downArea}>
                <div className={styles.itemDownArea}>
                    <div className={styles.itemDescription}>Ración</div>
                    <div className={styles.itemValue}>{portionValue}</div>
                </div>
                <div className={styles.itemDownArea}>
                    <div className={styles.itemDescription}>Calorias</div>
                    <div className={styles.itemValue}>{proteinValue}</div>
                </div>
                <div className={styles.itemDownArea}>
                    <div className={styles.itemDescription}>Proteínas</div>
                    <div className={styles.itemValue}>{caloriesValue}</div>
                </div>
                <div className={styles.itemDownArea}>
                    <div className={styles.itemDescription}>Grasa</div>
                    <div className={styles.itemValue}>{greaseValue}</div>
                </div>
                <div className={styles.itemDownArea}>
                    <div className={styles.itemDescription}>Sal</div>
                    <div className={styles.itemValue}>{saltValue}</div>
                </div>
            </div>
        </div>
    )

}