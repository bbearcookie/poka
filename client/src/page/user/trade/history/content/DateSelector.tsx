import React, { useCallback } from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Calendar from '@component/calendar/Calendar';

interface Props {
  todayDate: Date;
  startDate: Date;
  endDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
}

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
    <section>
      <Card styles={{ marginBottom: "5em" }}>
        <CardHeader>
          <h1 className="title">조회할 기간</h1>
        </CardHeader>
        <CardBody>
          <Calendar
            todayDate={todayDate}
            startDate={startDate}
            endDate={endDate}
            onChangeStartDate={onChangeStartDate}
            onChangeEndDate={onChangeEndDate}
          />
        </CardBody>
      </Card>
    </section>
  );
}

export default DateSelector;