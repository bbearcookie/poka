import { Fragment } from 'react';
import { useAppSelector } from '@app/redux/store';
import useSearcher from '@component/search/hook/useSearcher';
import useShippingList from '@component/list/shipping/useShippingList';
import Searcher from '@component/search/Searcher';
import { Card, CardHeader, CardBody } from '@component/card/basic/_styles';
import Table from '@component/table/Table';
import Col from '@component/table/styles/Col';
import Shipping from '@component/shipping/item/Shipping';
import SkeletonShipping from '@component/shipping/item/SkeletonShipping';
import NextPageFetcher from '@component/list/content/NextPageFetcher';

function ShippingSection() {
  const username = useAppSelector(state => state.auth.username);
  const searcher = useSearcher({
    defaultKeyword: [{ category: 'userName', title: '작성자', value: username, show: false }],
  });

  const { data: shippings, isFetching, hasNextPage, fetchNextPage } = useShippingList(searcher);

  return (
    <Card>
      <CardHeader className="search-header">
        <Searcher
          options={{
            shippingState: true,
            paymentState: true,
          }}
          hook={searcher}
        />
      </CardHeader>
      <CardBody className="item-section">
        <Table styles={{ itemHeight: '1em', itemPadding: '1em' }}>
          <colgroup>
            <Col width="33%" />
            <Col width="15%" />
            <Col width="15%" />
            <Col width="30%" />
          </colgroup>
          <thead>
            <tr>
              <th>요청 소유권</th>
              <th>결제 상태</th>
              <th>배송 상태</th>
              <th>요청일</th>
            </tr>
          </thead>
          <tbody>
            {shippings?.pages.map((page, i) => (
              <Fragment key={i}>
                {page.shippings.map(r => (
                  <Shipping
                    key={r.requestId}
                    to="/shipping/detail"
                    showOwner={false}
                    request={{
                      requestId: r.requestId,
                      state: r.state,
                      writtenTime: r.writtenTime,
                    }}
                    voucher={{ ...r.voucher.represent, amount: r.voucher.amount }}
                    author={r.author}
                    payment={r.payment}
                  />
                ))}
              </Fragment>
            ))}
            {isFetching && Array.from({ length: 10 }).map((_, i) => <SkeletonShipping key={i} />)}
          </tbody>
        </Table>
        <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
      </CardBody>
    </Card>
  );
}

export default ShippingSection;
