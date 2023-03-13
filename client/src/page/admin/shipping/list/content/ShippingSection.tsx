import React, { Fragment } from 'react';
import { InfiniteData } from '@tanstack/react-query';
import useSearcher from '@component/search/useSearcher';
import Searcher from '@component/search/Searcher';
import useShippingsQuery, { ResType } from '@api/query/shipping/useShippingsQuery';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Table from '@component/table/Table';
import Col from '@component/table/styles/Col';
import NextPageFetcher from '@component/list/content/NextPageFetcher';
import Shipping from './Shipping';

interface Props {}

function ShippingSection({  }: Props) {
  const { filter, keyword, filterDispatch, keywordDispatch } = useSearcher();
  const { data: shippings, isFetching, hasNextPage, refetch, fetchNextPage } = useShippingsQuery();

  return (
    <Card className="shipping-section">
      <CardHeader styles={{ padding: "1em 1em 0 1em"}}>
        <Searcher
          category={{
            userName: "사용자 아이디"
          }}
          options={{
            voucherState: true,
            shippingState: true,
            paymentState: true
          }}
          filter={filter}
          filterDispatch={filterDispatch}
          keyword={keyword}
          keywordDispatch={keywordDispatch}
        />
      </CardHeader>
      <CardBody styles={{ padding: "0" }}>
        <Table styles={{ itemHeight: "1em", itemPadding: "1em" }}>
          <colgroup>
            <Col width="25%" />
            <Col width="15%" />
            <Col width="15%" />
            <Col width="10%" />
            <Col width="25%" />
            <Col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th>요청자</th>
              <th>배송 상태</th>
              <th>결제 상태</th>
              <th>수량</th>
              <th>요청일</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {shippings?.pages.map((page, i) =>
            <Fragment key={i}>
              {page.shippings.map(r =>
              <Shipping
                key={r.requestId}
                shippingState={r.requestState}
                {...r}
              />)}
            </Fragment>)}
          </tbody>
        </Table>
        <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
      </CardBody>
    </Card>
  );
}

export default ShippingSection;