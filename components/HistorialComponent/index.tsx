import { InfoNutritionalDay } from '@/types/InfoNutritionalDay'
import styles from './styles.module.css'

type Props = {
    infoNutriDay : InfoNutritionalDay;
    light: boolean
}

export const HistorialComponent = ({ light, infoNutriDay }: Props) => {



    return (
        <div className={styles.container}>
            <div className={styles.headerHistorialContainer}>
                <div className={styles.headerDate}>{infoNutriDay.id}</div>
            </div>

            <div className={styles.historialArea}>
                <div className={styles.historialContainer} style={{ backgroundColor: light ? '#FAA846' : '#FA881E', border: light ? '2px solid #FA881E' : '2px solid #FAA846' }}>

                    <div className={styles.infoItem}>
                        <div className={styles.descriptionItem}>Proteínas</div>
                        <div className={styles.valueItem}>{infoNutriDay.protein}</div>
                    </div>

                    <div className={styles.infoItem}>
                        <div className={styles.descriptionItem}>Calorias</div>
                        <div className={styles.valueItem}>{infoNutriDay.calories}</div>
                    </div>

                    <div className={styles.infoItem}>
                        <div className={styles.descriptionItem}>Grasa</div>
                        <div className={styles.valueItem}>{infoNutriDay.grease}</div>
                    </div>

                    <div className={styles.infoItem}>
                        <div className={styles.descriptionItem}>Sal</div>
                        <div className={styles.valueItem}>{infoNutriDay.salt}</div>
                    </div>


                </div>



            </div>

        </div>
    )
}