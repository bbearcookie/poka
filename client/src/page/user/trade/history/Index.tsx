import { useState, useRef } from 'react';
import TitleLabel from '@component/label/TitleLabel';
import DateSelector from './content/DateSelector';
import HistoryList from './content/HistoryList';
import { StyledIndex } from './_styles';

function getToday() {
  let today = new Date(Date.now());
  today.setHours(0, 0, 0, 0);
  return today;
}

function Index() {
  const today = useRef(getToday());
  const [startDate, setStartDate] = useState(new Date(getToday().setDate(today.current.getDate() - 30)));
  const [endDate, setEndDate] = useState(today.current);

  return (
    <StyledIndex>
      <TitleLabel title="교환 내역" css={{ marginBottom: "2em" }} />
      <DateSelector todayDate={today.current} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
      <HistoryList startDate={startDate} endDate={endDate} />
    </StyledIndex>
  );
}

export default Index;