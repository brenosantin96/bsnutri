import styles from './styles.module.css';

type Props = {
    name: string;
    textLabel: string;
    fontSizeLabel: number;
    widthInput?: number;
}

export const InputMain = ({ name, textLabel, fontSizeLabel, widthInput  }: Props) => {

    return (
        <div className={styles.container}>
            <label className={styles.labelInput} htmlFor={name} style={{ fontSize: fontSizeLabel }}>{textLabel}</label>
            <input className={styles.styleInput} name={name} style={{ width: widthInput }} type="text" />
        </div>
    )
}