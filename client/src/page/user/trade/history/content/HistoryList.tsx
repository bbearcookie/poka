import React, { Fragment, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateEffect } from 'react-use';
import useUserTradeHistoryQuery from '@api/query/trade/useUserTradeHistoryQuery';
import { useAppSelector } from '@app/redux/reduxHooks';
import * as queryKey from '@api/queryKey';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import CardList from '@component/card/basic/CardList';
import NextPageFetcher from '@component/list/content/NextPageFetcher';
import History from './History';
import SkeletonHistory from './SkeletonHistory';

interface Props {
  startDate: Date;
  endDate: Date;
}

function HistoryList({ startDate, endDate }: Props) {
  const queryClient = useQueryClient();
  const { userId } = useAppSelector(state => state.auth);
  const { data: histories, refetch, isFetching, fetchNextPage, hasNextPage } = useUserTradeHistoryQuery(userId, { startDate, endDate });

  // 검색 필터 변경시 데이터 리패칭
  const handleRefetch = useCallback(async () => {
    queryClient.removeQueries(queryKey.userKeys.tradeHistory(userId));
    refetch();
  }, [userId, queryClient, refetch]);
  useUpdateEffect(() => {
    handleRefetch();
  }, [startDate, endDate]);

  return (
    <section>
      <Card>
        <CardHeader>
          <h1 className="title">기록</h1>
        </CardHeader>
        <CardBody styles={{ padding: "0" }}>
          <CardList>
            
            {histories?.pages.map((page, pageIdx) => 
            <Fragment key={pageIdx}>
              {page?.histories.map((item) => 
              <History
                key={item.logId}
                photo={{
                  photoName: item.photo.name,
                  groupName: item.photo.groupData.name,
                  memberName: item.photo.memberData.name,
                  imageName: item.photo.imageName
                }}
                destUser={{ ...item.destUser }}
                originUser={{ ...item.originUser }}
                loggedTime={new Date(item.loggedTime)}
              />)}
            </Fragment>)}

            {isFetching && Array.from({ length: 10 }).map((item, idx) => <SkeletonHistory key={idx} />)}

            <NextPageFetcher fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
          </CardList>
        </CardBody>
      </Card>
    </section>
  );
}

export default HistoryList;