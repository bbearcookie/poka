import { Fragment, useState, useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import { SearcherHook } from '@component/search/hook/useSearcher';
import useVouchersQuery, { FilterType } from '@api/query/voucher/useVouchersQuery';
import { IconType } from '@type/icon';
import NextPageFetcher from '@component/list/content/NextPageFetcher';
import VoucherItem from '@component/voucher/item/VoucherItem';
import SkeletonVoucherItem from '@component/voucher/item/SkeletonVoucherItem';
import { ItemSection } from '@component/list/content/_styles';

interface Props {
  hook: SearcherHook;
  showOwner?: boolean;
  excludeVoucherIds?: number[];
  icon?: IconType;
  handleSelect?: (voucherId: number) => void;
}

function VoucherList({ hook, showOwner = true, excludeVoucherIds, icon, handleSelect }: Props) {
  const { filter, keyword } = hook;
  
  const makeRefineFilter = useCallback(
    (): FilterType => ({
      groupIds: filter.groups.filter(g => g.checked).map(g => g.id),
      memberIds: filter.members.filter(m => m.checked).map(m => m.id),
      photoNames: keyword.keywords.filter(k => k.category === 'photoName').map(k => k.value),
      userNames: keyword.keywords.filter(k => k.category === 'userName').map(k => k.value),
      excludeVoucherIds: excludeVoucherIds || [],
      voucherState: filter.voucherState,
    }),
    [filter, keyword, excludeVoucherIds]
  );

  const [refine, setRefine] = useState<FilterType>(makeRefineFilter());

  // 데이터 가져오기
  const {
    data: vouchers,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useVouchersQuery(refine, { enabled: hook.initialized });

  // 검색 조건 변경시 새로운 필터 적용
  useUpdateEffect(() => {
    if (!hook.initialized) return;
    setRefine(makeRefineFilter());
  }, [filter, keyword, excludeVoucherIds]);

  return (
    <ItemSection templateColumnsSize="minmax(11.25em, 1fr)">
      {vouchers?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.vouchers.map((v, j) => (
            <VoucherItem
              key={v.voucherId}
              {...v}
              voucherState={v.state}
              showOwner={showOwner}
              icon={icon}
              onClick={handleSelect}
            />
          ))}
        </Fragment>
      ))}

      {isFetching && Array.from({ length: 20 }).map((_, i) => <SkeletonVoucherItem key={i} showOwner={showOwner} />)}

      <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </ItemSection>
  );
}

export default VoucherList;
