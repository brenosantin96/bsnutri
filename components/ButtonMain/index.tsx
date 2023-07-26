import { useEffect } from 'react';
import styles from './styles.module.css'

type Props = {
    textButton: string;
    onClick: () => void;
    fill?: boolean
    width?: string
    editting?: boolean
}

export const ButtonMain = ({ textButton, onClick, fill, width, editting }: Props) => {

    useEffect(() => {
        console.log(editting)
    }, [])

    return (
        <div onClick={onClick} className={styles.container}
            style={{
                backgroundColor: fill ? '#FAA846' : '#FFF',
                width: width ? width : '100%',
                pointerEvents: editting ? 'none' : 'all',
                opacity: editting ? '0.4' : 'initial'

            }}
        >
            <div className={styles.text}
                style={{ color: fill ? '#FFF' : '#FAA846' }}
            >
                {textButton}
            </div>
        </div>
    )

}