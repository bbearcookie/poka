import React, { useCallback } from 'react';
import Calendar from '@component/calendar/Calendar';

interface Props {
  todayDate: Date;
  startDate: Date;
  endDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
}
const DefaultProps = {};

function DateSelector({ todayDate, startDate, endDate, setStartDate, setEndDate }: Props) {
  const onChangeStartDate = useCallback((date: Date | null, e: React.SyntheticEvent<any, Event> | undefined) => {
    if (!date) return;
    setStartDate(date);
    if (date > endDate) setEndDate(date);
  }, [endDate, setStartDate, setEndDate]);

  const onChangeEndDate = useCallback((date: Date | null, e: React.SyntheticEvent<any, Event> | undefined) => {
    if (!date) return;
    setEndDate(date);
  }, [setEndDate]);

  return (
    <Calendar
      todayDate={todayDate}
      startDate={startDate}
      endDate={endDate}
      onChangeStartDate={onChangeStartDate}
      onChangeEndDate={onChangeEndDate}
    />
  );
}

export default DateSelector;