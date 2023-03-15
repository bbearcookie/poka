import React, { Fragment, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { useQueryClient } from '@tanstack/react-query';
import * as queryKey from '@api/queryKey';
import useShippingsQuery, { FilterType } from '@api/query/shipping/useShippingsQuery';
import { State as FilterState } from '@component/search/content/filter/reducer';
import { State as KeywordState } from '@component/search/content/keyword/reducer';
import Table from '@component/table/Table';
import Col from '@component/table/styles/Col';
import NextPageFetcher from '@component/list/content/NextPageFetcher';
import Shipping from './item/Shipping';
import SkeletonShipping from './item/SkeletonShipping';

interface Props {
  to?: string;
  filter: FilterState;
  keyword: KeywordState;
}

function ShippingList({ to, filter, keyword }: Props) {
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
    <>
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
              to={to}
              {...r}
            />)}
          </Fragment>)}
          {isFetching && Array.from({ length: 10 }).map((_, i) => <SkeletonShipping key={i} />)}
        </tbody>
      </Table>
      <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </>
  );
}

export default ShippingList;