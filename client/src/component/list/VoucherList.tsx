import React, { Fragment, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { useQueryClient } from '@tanstack/react-query';
import * as queryKey from '@api/queryKey';
import useVouchersQuery, { FilterType } from '@api/query/voucher/useVouchersQuery';
import { State as FilterState } from '@component/search/content/filter/reducer';
import { State as KeywordState } from '@component/search/content/keyword/reducer';
import { IconType } from '@type/icon';
import NextPageFetcher from '@component/list/content/NextPageFetcher';
import VoucherCard from '@component/photocard/voucher/VoucherCard';
import SkeletonVoucherCard from '@component/photocard/voucher/SkeletonVoucherCard';
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
  handleSelect
}: Props) {
  const queryClient = useQueryClient();
  const [refine, setRefine] = useState<FilterType>({
    groupIds: [],
    memberIds: [],
    photoNames: [],
    userNames: [],
    excludeVoucherIds: excludeVoucherIds || [],
    voucherState: filter.voucherState,
  });

  // 데이터 가져오기
  const { data: vouchers, isFetching, hasNextPage, refetch, fetchNextPage } = useVouchersQuery(refine, {
    enabled: filter.initialized
  });

  // 데이터 리패칭
  useUpdateEffect(() => {
    queryClient.removeQueries(queryKey.voucherKeys.all);
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
      voucherState: filter.voucherState
    });
  }, [filter, keyword, excludeVoucherIds]);

  return (
    <ItemSection>
      {vouchers?.pages.map((page, i) =>
      <Fragment key={i}>
        {page.vouchers.map((v, j) =>
        <VoucherCard
          key={v.voucherId}
          showOwner={showOwner}
          voucherId={v.voucherId}
          groupName={v.photo.groupData.name}
          memberName={v.photo.memberData.name}
          photoName={v.photo.name}
          username={v.owner.username}
          imageName={v.photo.imageName}
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