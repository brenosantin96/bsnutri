import { ChangeEvent, useState } from 'react';
import styles from './styles.module.css';

type Props = {
    value: string;
    type: 'text' | 'number';
    disabled: boolean;
    onlyText?: boolean
    onChange?: (newValue: string) => void;
}

export const InputSecondary = ({ value, type, disabled, onlyText, onChange }: Props) => {


    return (
        <div className={styles.container}>
            {onlyText &&
                <div className={styles.inputContainerDiv}>{value}</div>
            }
            {disabled && onChange &&
                <div className={styles.inputContainerDiv}>{value}</div>
            }
            {!disabled && onChange &&
                <input className={styles.inputContainer} type={type} disabled={disabled} value={value} onChange={e => onChange(e.target.value)} />
            }
        </div>
    )
}