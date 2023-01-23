import React, { useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateEffect } from 'react-use';
import useUserTradeHistoryQuery from '@api/query/trade/useUserTradeHistoryQuery';
import { useAppSelector } from '@app/redux/reduxHooks';
import * as queryKey from '@api/queryKey';
import { fetchUserTradeHistory } from '@api/api/trade';

interface Props {
  startDate: Date;
  endDate: Date;
}
const DefaultProps = {};

function HistoryList({ startDate, endDate }: Props) {
  const queryClient = useQueryClient();
  const { user_id } = useAppSelector(state => state.auth);
  const { data: histories, refetch, isFetching, fetchNextPage, hasNextPage } = useUserTradeHistoryQuery(user_id, { startDate, endDate });

  // 검색 필터 변경시 데이터 리패칭
  const handleRefetch = useCallback(async () => {
    queryClient.removeQueries(queryKey.userKeys.tradeHistory(user_id));
    refetch();
  }, [user_id, queryClient, refetch]);
  useUpdateEffect(() => {
    handleRefetch();
  }, [startDate, endDate]);

  console.log(histories?.pages[0]);

  return (
    <div>
      
    </div>
  );
}

export default HistoryList;