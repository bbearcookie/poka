import React, { useState, Fragment } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import * as queryKey from '@api/queryKey';
import { useUpdateEffect } from 'react-use';
import useSearcher from '@component/search/useSearcher';
import Searcher from '@component/search/Searcher';
import useShippingsQuery, { FilterType } from '@api/query/shipping/useShippingsQuery';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Table from '@component/table/Table';
import Col from '@component/table/styles/Col';
import NextPageFetcher from '@component/list/content/NextPageFetcher';
import Shipping from './Shipping';
import SkeletonShipping from './SkeletonShipping';

interface Props {}

function ShippingSection({  }: Props) {
  const { filter, keyword, filterDispatch, keywordDispatch } = useSearcher();
  const [refine, setRefine] = useState<FilterType>({
    userName: [],
    paymentState: filter.paymentState,
    shippingState: filter.shippingState
  });
  const queryClient = useQueryClient();

  const {
    data: shippings,
    isFetching, hasNextPage,
    refetch, fetchNextPage
  } = useShippingsQuery(refine, { enabled: filter.initialized });

  // 데이터 리패칭
  useUpdateEffect(() => {
    queryClient.removeQueries(queryKey.shippingKeys.all);
    refetch();
  }, [refine]);
  
  // 검색 조건 변경시 새로운 필터 적용
  useUpdateEffect(() => {
    setRefine({
      userName: keyword.keywords.filter(k => k.category === 'userName').map(k => k.value),
      shippingState: filter.shippingState,
      paymentState: filter.paymentState
    });
  }, [filter, keyword]);

  return (
    <Card>
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
            {isFetching && Array.from({ length: 10 }).map((_, i) => <SkeletonShipping key={i} />)}
          </tbody>
        </Table>
        <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
      </CardBody>
    </Card>
  );
}

export default ShippingSection;