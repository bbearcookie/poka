import React, { Fragment, useCallback } from 'react';
import useVouchersQuery from '@api/query/voucher/useVouchersQuery';
import { useUpdateEffect } from 'react-use';
import { useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from '@app/redux/reduxHooks';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as queryKey from '@api/queryKey';
import VoucherCard from '@component/photocard/VoucherCard';
import SkeletonVoucherCard from '@component/photocard/skeleton/SkeletonVoucherCard';
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
  const [viewRef, inView] = useInView();
  const queryClient = useQueryClient();

  // 데이터 가져오기
  const { data: vouchers, error, refetch, isFetching, fetchNextPage, hasNextPage }
  = useVouchersQuery(filter);

  // 다음 페이지 가져오기
  const handleFetchNextPage = useCallback(() => {
    if (!inView) return;
    if (!vouchers) return;
    if (!hasNextPage) return;
    
    fetchNextPage();
  }, [inView, vouchers, hasNextPage, fetchNextPage]);
  useUpdateEffect(() => {
    handleFetchNextPage();
  }, [inView]);

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
            showOwner={defaultFilter.owner === 'ALL' ? true : false}
            key={item.voucher_id}
            voucher={item}
            icon={icon}
            handleClickIcon={handleClickIcon}
          />
        )}
      </Fragment>)}

      {isFetching && Array.from({length: 20}).map((_, idx) => 
        <SkeletonVoucherCard key={idx} />
      )}
      <div ref={viewRef} />
    </section>
  );
}

export default VoucherList;