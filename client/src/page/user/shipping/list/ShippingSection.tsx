import React, { Fragment, useEffect } from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import useSearcher from '@component/search/useSearcher';
import useShippingList from '@component/list/shipping/useShippingList';
import Searcher from '@component/search/Searcher';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Table from '@component/table/Table';
import Col from '@component/table/styles/Col';
import Shipping from '@component/list/shipping/item/Shipping';
import SkeletonShipping from '@component/list/shipping/item/SkeletonShipping';
import NextPageFetcher from '@component/list/content/NextPageFetcher';

function ShippingSection() {
  const { filter, keyword, filterDispatch, keywordDispatch } = useSearcher();
  const username = useAppSelector(state => state.auth.username);

  // 로그인 한 사용자의 배송 요청만 보이도록 기본 키워드 추가
  useEffect(() => {
    keywordDispatch({
      type: 'ADD_KEYWORD',
      value: { category: 'userName', title: '작성자', value: username, show: false }
    });
  }, [username, keywordDispatch]);

  const {
    data: shippings,
    isFetching,
    hasNextPage,
    fetchNextPage
  } = useShippingList(filter, keyword);

  return (
    <Card>
      <CardHeader styles={{ padding: "1em 1em 0 1em" }}>
        <Searcher
          options={{
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
            {shippings?.pages.map((page, i) =>
            <Fragment key={i}>
              {page.shippings.map(r =>
              <Shipping
                key={r.requestId}
                to="/shipping/detail"
                showOwner={false}
                request={{
                  requestId: r.requestId,
                  state: r.state,
                  writtenTime: r.writtenTime
                }}
                {...r}
              />)}
            </Fragment>)}
            {isFetching && Array.from({ length: 10 }).map((_, i) => <SkeletonShipping key={i} />)}
          </tbody>
        </Table>
        <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
      </CardBody>
    </Card>
  );
}

export default ShippingSection;