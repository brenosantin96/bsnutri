import { ChangeEvent, useState } from 'react';
import styles from './styles.module.css';

type Props = {
    name: string;
    textLabel: string;
    fontSizeLabel: number;
    typeInput: 'text' | 'password' | 'number',
    widthInput?: number;
    onlyNumber?: boolean;
    onChange: (newValue: string) => void;
    onBlur?: () => void;
}

export const InputMain = ({ name, textLabel, fontSizeLabel, widthInput, typeInput, onChange, onBlur, onlyNumber }: Props) => {


    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <div className={styles.container}>
            <label className={styles.labelInput} htmlFor={name} onBlur={onBlur}
                style={{
                    fontSize: fontSizeLabel,
                    color: focused ? "#FAA846" : "#DFDFDF"
                }}>
                {textLabel}
            </label>
            <input className={styles.styleInput} onChange={e => onChange(e.target.value)} name={name} onBlur={handleBlur} onFocus={handleFocus}
                style={{
                    width: widthInput,
                    border: focused ? "1px solid #FAA846" : "1px solid #DFDFDF"
                }}
                type={typeInput} />
        </div>
    )
}