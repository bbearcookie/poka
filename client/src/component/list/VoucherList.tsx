import React, { Fragment, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { useQueryClient } from '@tanstack/react-query';
import * as queryKey from '@api/queryKey';
import useVouchersQuery, { FilterType } from '@api/query/voucher/useNewVouchersQuery';
import { State as FilterState } from '@component/search/content/filter/reducer';
import { State as KeywordState } from '@component/search/content/keyword/reducer';
import { IconType } from '@type/icon';
import NextPageFetcher from '@component/list/content/NextPageFetcher';
import VoucherCard from '@component/photocard/voucher/VoucherCard';
import SkeletonVoucherCard from '@component/photocard/voucher/SkeletonVoucherCard';
import { ItemSection } from '@component/list/_styles';

interface Props {
  filter: FilterState;
  keyword: KeywordState;
  showOwner?: boolean;
  excludeVoucherId?: number[];
  icon?: IconType;
  handleSelect?: (voucherId: number) => void;
}

function VoucherList({
  filter,
  keyword,
  showOwner = true,
  excludeVoucherId,
  icon,
  handleSelect
}: Props) {
  const queryClient = useQueryClient();
  const [refine, setRefine] = useState<FilterType>({
    groupId: [],
    memberId: [],
    photoName: [],
    userName: [],
    voucherState: filter.voucherState,
    excludeVoucherId: excludeVoucherId || [],
  });

  // 데이터 가져오기
  const { data: vouchers, isFetching, hasNextPage, refetch, fetchNextPage }
  = useVouchersQuery(refine);

  // 데이터 리패칭
  useUpdateEffect(() => {
    queryClient.removeQueries(queryKey.voucherKeys.all);
    refetch();
  }, [refine]);

  // 검색 조건 변경시 새로운 필터 적용
  useUpdateEffect(() => {
    setRefine({
      groupId: filter.groups.filter(g => g.checked).map(g => g.id),
      memberId: filter.members.filter(m => m.checked).map(m => m.id),
      photoName: keyword.keywords.filter(k => k.category === 'photoName').map(k => k.value),
      userName: keyword.keywords.filter(k => k.category === 'userName').map(k => k.value),
      excludeVoucherId: excludeVoucherId || [],
      voucherState: filter.voucherState
    });
  }, [filter, keyword, excludeVoucherId]);

  return (
    <ItemSection>
      {vouchers?.pages.map((page, i) =>
      <Fragment key={i}>
        {page.vouchers.map(v =>
        <VoucherCard
          key={v.voucherId}
          voucherId={v.voucherId}
          showOwner={showOwner}
          groupName={v.groupName}
          memberName={v.memberName}
          photoName={v.name}
          username={v.username}
          imageName={v.imageName}
          voucherState={v.state}
          icon={icon}
          handleClick={handleSelect}
        />)}
      </Fragment>)}

      {isFetching && Array.from({length: 20}).map((_, i) => <SkeletonVoucherCard key={i} />)}
      <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </ItemSection>
  );
}

export default VoucherList;