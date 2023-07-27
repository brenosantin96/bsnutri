import { useEffect } from 'react';
import styles from './styles.module.css'

type Props = {
    textButton: string;
    onClick: () => void;
    fill?: boolean
    width?: string
    disabled?: boolean
}

export const ButtonMain = ({ textButton, onClick, fill, width, disabled }: Props) => {


    return (
        <div onClick={onClick} className={styles.container}
            style={{
                backgroundColor: fill ? '#FAA846' : '#FFF',
                width: width ? width : '100%',
                pointerEvents: !disabled ? 'none' : 'all',
                opacity: !disabled ? '0.4' : 'initial'

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