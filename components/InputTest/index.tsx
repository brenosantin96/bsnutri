import styles from './styles.module.css';

type Props = {
    value: string;
    onChange: (newValue: string) => void;
}

export const InputTest = ({ value, onChange }: Props) => {


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        onChange(text); // Chama a função de callback do componente pai para atualizar o texto
    };


    return (
        <div className={styles.container}>
            <input type="text" value={value} onChange={handleChange} />
        </div>
    )
}