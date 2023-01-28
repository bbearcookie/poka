import React, { Fragment, useCallback } from 'react';
import useVouchersQuery from '@api/query/voucher/useVouchersQuery';
import { useUpdateEffect } from 'react-use';
import { useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '@app/redux/reduxHooks';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as queryKey from '@api/queryKey';
import NextPageFetcher from '@component/list/NextPageFetcher';
import VoucherCard from '@component/photocard/voucher/VoucherCard';
import SkeletonVoucherCard from '@component/photocard/voucher/SkeletonVoucherCard';
import { DefaultFilterType } from '../VoucherListCard';

interface Props {
  defaultFilter: DefaultFilterType;
  icon?: IconDefinition;
  handleClickIcon?: (photocardId: number) => void;
  children?: React.ReactNode;
}
const DefaultProps = {};

function VoucherList({ defaultFilter, icon, handleClickIcon }: Props) {
  const filter = useAppSelector((state) => state.voucherList.filter);
  const queryClient = useQueryClient();

  // 데이터 가져오기
  const { data: vouchers, refetch, isFetching, fetchNextPage, hasNextPage }
  = useVouchersQuery(filter);

  // 검색 필터 변경시 데이터 리패칭
  const handleRefetch = useCallback(async () => {
    queryClient.removeQueries(queryKey.voucherKeys.all);
    refetch();
  }, [queryClient, refetch]);
  useUpdateEffect(() => {
    handleRefetch();
  }, [filter]);

  return (
    <section className="item-section">
      {vouchers?.pages.map((page, pageIdx) => 
      <Fragment key={pageIdx}>
        {page?.vouchers.map(item => 
          <VoucherCard
            showOwner={defaultFilter.owner === 'all' ? true : false}
            key={item.voucherId}
            photoName={item.name}
            groupName={item.groupName}
            memberName={item.memberName}
            imageName={item.imageName}
            username={item.username}
            voucherId={item.voucherId}
            voucherState={item.state}
            icon={icon}
            handleClickIcon={handleClickIcon}
          />
        )}
      </Fragment>)}

      {isFetching && Array.from({length: 20}).map((_, idx) => 
        <SkeletonVoucherCard key={idx} />
      )}

      <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </section>
  );
}

export default VoucherList;