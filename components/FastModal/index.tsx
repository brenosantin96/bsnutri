import React, { useEffect } from 'react';
import styles from './styles.module.css'

type Props = {
  text: string;
  timer: number;
  hasUpdated: (bool: boolean) => void;
}

const FastModal = ({ text, timer, hasUpdated }: Props) => {

  useEffect(() => {
    setInterval(() => hasUpdated(true), timer)
  })

  return (
    <div className={styles.container}>
      <div className={styles.modalContent}>
        <p className={styles.textFastModal}>{text}</p>
      </div>
    </div>
  )
}

export default FastModal