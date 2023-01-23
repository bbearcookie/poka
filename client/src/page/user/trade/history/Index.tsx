import React, { useState, useRef } from 'react';
import DateSelector from './content/DateSelector';
import HistoryList from './content/HistoryList';
import './Index.scss';

interface Props {

}
const DefaultProps = {};

function getToday() {
  let today = new Date(Date.now());
  today.setHours(0, 0, 0, 0);
  return today;
}

function Index({  }: Props) {
  const today = useRef(getToday());
  const [startDate, setStartDate] = useState(new Date(getToday().setDate(today.current.getDate() - 30)));
  const [endDate, setEndDate] = useState(today.current);

  return (
    <div className="TradeHistoryPage">
      <h1 className="title-label">교환 내역</h1>
      <DateSelector todayDate={today.current} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
      <HistoryList startDate={startDate} endDate={endDate} />
    </div>
  );
}

export default Index;