import styles from './styles.module.css'
import Image from 'next/image'
import { Header } from '../Header/index'
import { useContext, useState } from 'react'
import { Icon } from '../Icon/index'
import Link from 'next/link'
import Elipse5 from '../../public/Elipse5.png'
import { AuthContext } from '@/contexts/Auth/AuthContext'

type Props = {
    menuOpened: boolean;
    onClose: () => void;
}


export const Sidebar = ({ menuOpened, onClose }: Props) => {

    const auth = useContext(AuthContext);

    return (

        <div className={styles.container} style={{ width: menuOpened ? '100vw' : '0' }}>

            <div className={styles.area}>
                <div className={styles.header}>
                    <Header title={`Bien Venido ${auth.user?.name}`} rightIcon={"menu"} onClickRightIcon={onClose} textLeft />
                </div>
                <div className={styles.midArea}>
                    <div className={styles.menuItemsMidArea}>
                        <div className={styles.menuItem}>
                            <div className={styles.menuItemIcon}>
                                <Icon svg='meat' width={24} height={24} />
                            </div>
                            <div className={styles.menuItemText}>
                                <Link legacyBehavior href={`/foods`}><a>Alimentos</a></Link>
                            </div>
                        </div>
                        <div className={styles.menuItem}>
                            <div className={styles.menuItemIcon}>
                                <Icon svg='meal' width={24} height={24} />
                            </div>
                            <div className={styles.menuItemText}>
                                <Link legacyBehavior href={`/meals`}><a>Comidas</a></Link>
                            </div>
                        </div>
                        <div className={styles.menuItem}>
                            <div className={styles.menuItemIcon}>
                                <Icon svg='book' width={24} height={24} />
                            </div>
                            <div className={styles.menuItemText}>
                                <Link legacyBehavior href={`/calendar`}><a>Historial</a></Link>
                            </div>
                        </div>
                        <div className={styles.menuItem}>
                            <div className={styles.menuItemIcon}>
                                <Icon svg='fav' width={24} height={24} />
                            </div>
                            <div className={styles.menuItemText}>
                                <Link legacyBehavior href={`/favorites`}><a>Favoritos</a></Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.imageMidArea}>
                        <Image src={Elipse5} alt="Image Elipse" />
                    </div>
                </div>
                <div className={styles.downArea}>
                    <div className={styles.menuItem}>
                        <div className={styles.menuItemIcon}>
                            <Icon svg='logout' width={24} height={24} />
                        </div>
                        <div className={styles.menuItemText}>
                            <Link legacyBehavior href={`/logout`}><a>Salir</a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}