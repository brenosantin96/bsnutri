import styles from './styles.module.css'

type Props = {
    textButton: string;
    onClick: () => void;
    fill?: boolean
    width?: string
}

export const ButtonMain = ({ textButton, onClick, fill, width }: Props) => {

    return (
        <div onClick={onClick} className={styles.container}
            style={{ backgroundColor: fill ? '#FAA846' : '#FFF', width: width ? width : '100%'}}
>
            <div className={styles.text}
                style={{ color: fill ? '#FFF' : '#FAA846' }}
            >
                {textButton}
            </div>
        </div>
    )

}