import styles from './styles.module.css'
import { Icon } from '../Icon'


type Props = {
    icon: string;
}

export const ButtonWithIcon = ({ icon }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.iconArea}>
                <Icon svg={icon} height={24} width={24}></Icon>
            </div>
            <input type="text" />
        </div>
    )
}