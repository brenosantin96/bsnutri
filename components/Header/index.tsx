import { Icon } from '../Icon';
import styles from './styles.module.css'

type Props = {
    title: string;
    leftIcon?: string;
    onClickLeftIcon?: () => void;
    onClickRightIcon?: () => void;
    rightIcon?: string;
}

export const Header = ({ title, leftIcon, rightIcon, onClickLeftIcon, onClickRightIcon }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.leftArea}>
                {leftIcon &&
                    <div onClick={onClickLeftIcon}>
                        <Icon svg={leftIcon} height={30} width={30} />
                    </div>
                }
            </div>
            <div className={styles.centerArea}>
                {title}
            </div>
            <div className={styles.rightArea}>
                {rightIcon &&
                    <div onClick={onClickRightIcon}>
                        <Icon svg={rightIcon} height={30} width={30} />
                    </div>
                }
            </div>

        </div>
    )
}