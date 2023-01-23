import React from 'react';
import useUserTradeHistoryQuery from '@api/query/trade/useUserTradeHistoryQuery';
import { useAppSelector } from '@app/redux/reduxHooks';

interface Props {
  startDate: Date;
  endDate: Date
}
const DefaultProps = {};

function HistoryList({ startDate, endDate }: Props) {
  const { user_id } = useAppSelector(state => state.auth);
  const data = useUserTradeHistoryQuery(user_id, { startDate, endDate });

  return (
    <div>
      
    </div>
  );
}

export default HistoryList;