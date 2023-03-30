import { useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import useVoucherLogsQuery from '@api/query/voucher/useVoucherLogsQuery';
import { useInView } from 'react-intersection-observer';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Log from './log/Log';
import SkeletonLog from './log/SkeletonLog';

interface Props {
  voucherId: number;
}

function LogList({ voucherId }: Props) {
  const [viewRef, inView] = useInView();

  // 데이터 가져오기
  const { data: logs, error, refetch, isFetching, fetchNextPage, hasNextPage } = useVoucherLogsQuery(voucherId);

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
          {isFetching && Array.from({length: 20}).map((_, idx) => (
            <SkeletonLog key={idx} />
          ))}
        </ul>

        {logs?.pages.map((page, pageIdx) => 
          <ul key={pageIdx}>
            {page?.logs.map((item) => (
              <Log key={item.logId} log={item} />
            ))}
          </ul>
        )}

        <div ref={viewRef} />
      </CardBody>
    </Card>
  );
}

export default LogList;