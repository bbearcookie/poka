import { Fragment } from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardList from '@component/card/basic/CardList';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import NextPageFetcher from '@component/list/content/NextPageFetcher';
import useVoucherLogsQuery from '@api/query/voucher/useVoucherLogsQuery';
import VoucherLog from '@component/voucher/log/VoucherLog';

interface Props {
  voucherId: number;
}

function VoucherLogList({ voucherId }: Props) {
  const { data: logs, fetchNextPage, hasNextPage } = useVoucherLogsQuery(voucherId);

  return (
    <Card>
      <CardHeader>
        <TitleLabel title="기록" />
      </CardHeader>
      <CardList>
        {logs?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.logs.map(log => (
              <VoucherLog key={log.logId} {...log} />
            ))}
          </Fragment>
        ))}
      </CardList>
      <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </Card>
  );
}

export default VoucherLogList;
