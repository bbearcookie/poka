import { Fragment, useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import useUserTradeHistoryQuery from '@api/query/trade/useUserTradeHistoryQuery';
import { useAppSelector } from '@app/redux/store';
import { Card, CardHeader, CardList } from '@component/card/basic/_styles';
import NextPageFetcher from '@component/list/content/NextPageFetcher';
import History from './History';
import SkeletonHistory from './SkeletonHistory';

interface Props {
  startDate: Date;
  endDate: Date;
}

function HistoryList({ startDate, endDate }: Props) {
  const { userId } = useAppSelector(state => state.auth);

  const {
    data: histories,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useUserTradeHistoryQuery(
    userId,
    { startDate, endDate },
    {
      enabled: userId !== 0,
    }
  );

  // 검색 필터 변경시 데이터 리패칭
  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);
  useUpdateEffect(() => {
    handleRefetch();
  }, [startDate, endDate, handleRefetch]);

  return (
    <section>
      <Card>
        <CardHeader>
          <h1 className="title">기록</h1>
        </CardHeader>
        <CardList>
          {histories?.pages.map((page, pageIdx) => (
            <Fragment key={pageIdx}>
              {page?.histories.map(item => (
                <History
                  key={item.logId}
                  photo={item.photo}
                  destUser={{ ...item.destUser }}
                  originUser={{ ...item.originUser }}
                  loggedTime={new Date(item.loggedTime)}
                />
              ))}
            </Fragment>
          ))}

          {isFetching &&
            Array.from({ length: 10 }).map((item, idx) => <SkeletonHistory key={idx} />)}

          <NextPageFetcher fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
        </CardList>
      </Card>
    </section>
  );
}

export default HistoryList;
