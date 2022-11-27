import React, { useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import * as queryKey from '@util/queryKey';
import * as voucherAPI from '@api/voucherAPI';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Log from './log/Log';
import SkeletonLog from './log/SkeletonLog';

interface LogListProps {
  voucherId: number;
  children?: React.ReactNode;
}
const LogListDefaultProps = {};

function LogList({ voucherId, children }: LogListProps & typeof LogListDefaultProps) {
  const [viewRef, inView] = useInView();

  // 데이터 가져오기
  const { data: logs, error, refetch, isFetching, fetchNextPage, hasNextPage } =
  useInfiniteQuery<typeof voucherAPI.getVoucherLogDetail.resType, AxiosError<ErrorType>>
  (queryKey.voucherKeys.log(voucherId), 
  ({ pageParam = 0 }) => voucherAPI.getVoucherLogDetail.axios(voucherId, pageParam),
  {
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.paging.hasNextPage && lastPage?.paging.pageParam + 1;
    },
    refetchOnWindowFocus: false
  });

  // 다음 페이지 가져오기
  const handleFetchNextPage = useCallback(() => {
    if (!inView) return;
    if (!logs) return;
    if (!hasNextPage) return;

    fetchNextPage();
  }, [inView, logs, hasNextPage, fetchNextPage]);
  useUpdateEffect(() => {
    handleFetchNextPage();
  }, [inView]);

  return (
    <Card className="LogListCard">
      <CardHeader>
        <h1 className="label">기록</h1>
      </CardHeader>
      <CardBody className="log-section" styles={{ padding: "0" }}>
        
        <ul>
          {/* <SkeletonLog /> */}
          {isFetching && Array.from({length: 20}).map((_, idx) => (
            <SkeletonLog key={idx} />
          ))}
        </ul>

        {logs?.pages.map((page, pageIdx) => 
          <ul key={pageIdx}>
            {page?.logs.map((item) => (
              <Log key={item.log_id} log={item} />
            ))}
          </ul>
        )}

        <div ref={viewRef} />
      </CardBody>
    </Card>
  );
}

LogList.defaultProps = LogListDefaultProps;
export default LogList;