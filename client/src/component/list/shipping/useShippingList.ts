import { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import useShippingsQuery, { FilterType } from '@api/query/shipping/useShippingsQuery';
import { SearcherHook } from '@component/search/hook/useSearcher';

// 필터, 키워드 조건에 따라 배송 요청 목록을 조회하고 결과를 반환함
export default function useShippingList(hook: SearcherHook) {
  const { filter, keyword, initialized } = hook;

  const [refine, setRefine] = useState<FilterType>({
    userNames: [],
    paymentState: filter.paymentState,
    shippingState: filter.shippingState,
  });
  const query = useShippingsQuery(refine, { enabled: initialized });

  // 데이터 리패칭
  useUpdateEffect(() => {
    query.refetch();
  }, [refine]);

  // 검색 조건 변경시 새로운 필터 적용
  useUpdateEffect(() => {
    setRefine({
      userNames: keyword.keywords.filter(k => k.category === 'userName').map(k => k.value),
      shippingState: filter.shippingState,
      paymentState: filter.paymentState,
    });
  }, [filter, keyword]);

  return query;
}
