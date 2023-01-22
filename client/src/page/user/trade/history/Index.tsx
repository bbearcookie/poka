import React from 'react';
import Calendar from '@component/calendar/Calendar';
import './Index.scss';

interface Props {

}
const DefaultProps = {};

function Index({  }: Props) {
  

  return (
    <div className="TradeHistoryPage">
      <h1 className="title-label">교환 내역</h1>
      <Calendar />
    </div>
  );
}

export default Index;