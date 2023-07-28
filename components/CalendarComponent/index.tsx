import React from 'react';
import styles from './styles.module.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/router';

type Props = {
    selectedDate: any; 
    onChangez: (date: Date) => void; 
  }

const CalendarComponent = ({ selectedDate, onChangez }: Props) => {

    const router = useRouter();
    
    const handleDateClick = (date: any, event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        
        onChangez(date);

      };

    return (
        <div className={styles.container}>
            <Calendar onChange={handleDateClick} value={selectedDate} locale='es' />
        </div>
    )
}

export default CalendarComponent;