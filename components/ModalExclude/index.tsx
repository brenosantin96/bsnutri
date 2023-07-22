import { on } from 'events';
import styles from './styles.module.css'

type Props = {
    valueToRemove: string;
    id: number;
    menuOpened: boolean;
    onClose: () => void;
    onDelete: (id : number) => void;
}

export const ModalExclude = ({ valueToRemove, id, menuOpened, onClose, onDelete }: Props) => {

    const handleDelete = () => {
        onDelete(id)
    }

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
                    <div className={styles.bottomAreaYesButton} onClick={handleDelete}>Si</div>
                    <div className={styles.bottomAreaNoButton} onClick={onClose}>No</div>
                </div>
            </div>
        </div>
    )
}