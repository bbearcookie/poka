import { useState, useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import useShippingsQuery, { FilterType } from '@api/query/shipping/useShippingsQuery';
import { SearcherHook } from '@component/search/hook/useSearcher';

// 필터, 키워드 조건에 따라 배송 요청 목록을 조회하고 결과를 반환함
export default function useShippingList(hook: SearcherHook) {
  const { filter, keyword, initialized } = hook;

  const makeRefineFilter = useCallback(
    (): FilterType => ({
      userNames: keyword.keywords.filter(k => k.category === 'userName').map(k => k.value),
      shippingState: filter.shippingState,
      paymentState: filter.paymentState,
    }),
    [filter, keyword]
  );

  const [refine, setRefine] = useState<FilterType>(makeRefineFilter());
  const query = useShippingsQuery(refine, { enabled: initialized });

  // 검색 조건 변경시 새로운 필터 적용
  useUpdateEffect(() => {
    if (!initialized) return;
    setRefine(makeRefineFilter());
  }, [filter, keyword]);

  return query;
}
