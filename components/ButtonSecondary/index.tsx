import styles from './styles.module.css'

type Props = {
    textButton : string
}

export const ButtonSecondary = ({textButton} : Props) => {

    return(
        <div className={styles.container}>
            <div className={styles.text}>{textButton}</div>
        </div>
    )

}