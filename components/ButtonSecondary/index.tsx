import styles from './styles.module.css'

type Props = {
    textButton : string;
    onClick : () => void;
}

export const ButtonSecondary = ({textButton, onClick} : Props) => {

    return(
        <div onClick={onClick} className={styles.container}>
            <div className={styles.text}>{textButton}</div>
        </div>
    )

}