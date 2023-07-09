import styles from './styles.module.css';

type Props = {
    name: string;
    textLabel: string;
    fontSizeLabel: number;
    typeInput: 'text' | 'password',
    widthInput?: number;
}

export const InputMain = ({ name, textLabel, fontSizeLabel, widthInput, typeInput  }: Props) => {

    return (
        <div className={styles.container}>
            <label className={styles.labelInput} htmlFor={name} style={{ fontSize: fontSizeLabel }}>{textLabel}</label>
            <input className={styles.styleInput} name={name} style={{ width: widthInput }} type={typeInput} />
        </div>
    )
}