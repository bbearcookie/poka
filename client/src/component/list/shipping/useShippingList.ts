import { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { useQueryClient } from '@tanstack/react-query';
import { State as FilterState } from '@component/search/content/filter/reducer';
import { State as KeywordState } from '@component/search/content/keyword/reducer';
import * as queryKey from '@api/queryKey';
import useShippingsQuery, { FilterType } from '@api/query/shipping/useShippingsQuery';

// 필터, 키워드 조건에 따라 배송 요청 목록을 조회하고 결과를 반환함
export default function useShippingList(
  filter: FilterState,
  keyword: KeywordState
) {
  const [refine, setRefine] = useState<FilterType>({
    userNames: [],
    paymentState: filter.paymentState,
    shippingState: filter.shippingState
  });
  const query = useShippingsQuery(refine, { enabled: filter.initialized });
  const queryClient = useQueryClient();

  // 데이터 리패칭
  useUpdateEffect(() => {
    queryClient.removeQueries(queryKey.shippingKeys.all);
    query.refetch();
  }, [refine]);
  
  // 검색 조건 변경시 새로운 필터 적용
  useUpdateEffect(() => {
    setRefine({
      userNames: keyword.keywords.filter(k => k.category === 'userName').map(k => k.value),
      shippingState: filter.shippingState,
      paymentState: filter.paymentState
    });
  }, [filter, keyword]);

  return query;
}