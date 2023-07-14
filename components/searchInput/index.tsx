import styles from './styles.module.css'
import { Icon } from '../Icon'
import { useState } from 'react';

type Props = {
    onSearch: (textValue: string) => void;
    icon: string;
}

export const SearchInput = ({ onSearch, icon }: Props) => {

    const [searchValue, setSearchValue] = useState("");

    //toda vez que soltar a tecla, vai rodar a funcao handleSearch que executa onSearch
    //a funcao onSearch pega o atual valor do componente e joga para o componente pai lidar com essa funcao
    const handleSearch = () => {
        onSearch(searchValue);
    }

    return (
        <div className={styles.container}>
            <div className={styles.iconArea}>
                <Icon svg={icon} height={24} width={24}></Icon>
            </div>
            <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onKeyUp={handleSearch} />
        </div>
    )
}