import { InfoNutritionalDay } from '@/types/InfoNutritionalDay'
import Link from 'next/link';
import styles from './styles.module.css'

type Props = {
    infoNutriDay: InfoNutritionalDay;
    light: boolean
}

export const HistorialComponent = ({ light, infoNutriDay }: Props) => {



    return (
        <div className={styles.container}>
            <div className={styles.headerHistorialContainer}>
                <div className={styles.headerDate}>{infoNutriDay.id}</div>
            </div>

            <div className={styles.historialArea}>
                <Link legacyBehavior href={`/calendar/${infoNutriDay.id}`}>
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

                        <div className={styles.infoItem}>
                            <div className={styles.descriptionItem}>Dia Finalizado</div>
                            <div className={styles.valueItem}
                                style={
                                    {
                                        color: infoNutriDay.finalizedDay ? "#00f420" : "#e50d0d",

                                    }

                                }
                            >{infoNutriDay.finalizedDay ? "SI" : "NO"}</div>
                        </div>


                    </div>


                </Link>
            </div>

        </div>
    )
}