import { Fragment, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import useVouchersQuery, { FilterType } from '@api/query/voucher/useVouchersQuery';
import { State as FilterState } from '@component/search/content/filter/reducer';
import { State as KeywordState } from '@component/search/content/keyword/reducer';
import { IconType } from '@type/icon';
import NextPageFetcher from '@component/list/content/NextPageFetcher';
import VoucherItem from '@component/voucher/item/VoucherItem';
import SkeletonVoucherItem from '@component/voucher/item/SkeletonVoucherItem';
import { ItemSection } from '@component/list/content/_styles';

interface Props {
  filter: FilterState;
  keyword: KeywordState;
  showOwner?: boolean;
  excludeVoucherIds?: number[];
  icon?: IconType;
  handleSelect?: (voucherId: number) => void;
}

function VoucherList({
  filter,
  keyword,
  showOwner = true,
  excludeVoucherIds,
  icon,
  handleSelect,
}: Props) {
  const [refine, setRefine] = useState<FilterType>({
    groupIds: [],
    memberIds: [],
    photoNames: [],
    userNames: [],
    excludeVoucherIds: excludeVoucherIds || [],
    voucherState: filter.voucherState,
  });

  // 데이터 가져오기
  const {
    data: vouchers,
    isFetching,
    hasNextPage,
    refetch,
    fetchNextPage,
  } = useVouchersQuery(refine, {
    enabled: filter.initialized,
  });

  // 데이터 리패칭
  useUpdateEffect(() => {
    refetch();
  }, [refine]);

  // 검색 조건 변경시 새로운 필터 적용
  useUpdateEffect(() => {
    setRefine({
      groupIds: filter.groups.filter(g => g.checked).map(g => g.id),
      memberIds: filter.members.filter(m => m.checked).map(m => m.id),
      photoNames: keyword.keywords.filter(k => k.category === 'photoName').map(k => k.value),
      userNames: keyword.keywords.filter(k => k.category === 'userName').map(k => k.value),
      excludeVoucherIds: excludeVoucherIds || [],
      voucherState: filter.voucherState,
    });
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

      {isFetching &&
        Array.from({ length: 20 }).map((_, i) => (
          <SkeletonVoucherItem key={i} showOwner={showOwner} />
        ))}

      <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </ItemSection>
  );
}

export default VoucherList;
