import styles from './styles.module.css'

type Props = {
    valueToRemove: string;
    id: number;
    menuOpened: boolean;
    onClose: () => void;
}

export const ModalExclude = ({ valueToRemove, id, menuOpened, onClose }: Props) => {

    return (
        <div className={styles.container} style={{ width: menuOpened ? '50vw' : '0' }}>
            <div className={styles.modal}>
                <div className={styles.headerModal}>
                    ¿Estás seguro de que quieres eliminar:
                </div>
                <div className={styles.modalProduct}>
                    {`${id} - ${valueToRemove}`}
                </div>
                <div className={styles.bottomArea}>
                    <div className={styles.bottomAreaYesButton}>Si</div>
                    <div className={styles.bottomAreaNoButton}>No</div>
                </div>
            </div>
        </div>
    )
}