import styles from '../styles/test.module.css'
import { Header } from "@/components/Header";
import { useRouter } from 'next/router';
import { InputTest } from '@/components/InputTest';
import { useState } from 'react';

const Test = () => {

    const router = useRouter();

    const [texto, setTexto] = useState('');

    const handleInputChange = (text: string) => {
        setTexto(text); // Atualiza o estado do texto no componente pai
    };

    return (
        <>
            <Header leftIcon='back' title="Página de Testes" onClickLeftIcon={() => router.push('/')} />
            <div className={styles.container}>
                {/* Renderiza o componente Input passando o texto e a função de callback */}
                <InputTest value={texto} onChange={handleInputChange} />

                {/* Exibe o texto atualizado pelo componente pai */}
                <p>Texto atual: {texto}</p>
            </div>
        </>
    )
}


export default Test;
