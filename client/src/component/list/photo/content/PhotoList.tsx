import React, { Fragment, useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import { useAppSelector } from '@app/redux/reduxHooks';
import { useQueryClient } from '@tanstack/react-query';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as queryKey from '@api/queryKey';
import PhotoCard from '@component/photocard/PhotoCard';
import SkeletonPhotoCard from '@component/photocard/skeleton/SkeletonPhotoCard';
import usePhotosQuery from '@api/query/photo/usePhotosQuery';
import NextPageFetcher from '@component/list/NextPageFetcher';

interface Props {
  icon?: IconDefinition;
  handleClickIcon?: (photocardId: number) => void;
}
const DefaultProps = {};

function PhotoList({ icon, handleClickIcon }: Props) {
  const filter = useAppSelector((state) => state.photoListCard.filter);
  const queryClient = useQueryClient();

  // 데이터 가져오기
  const { data: photos, refetch, isFetching, fetchNextPage, hasNextPage }
  = usePhotosQuery(filter);

  // 검색 필터 변경시 데이터 리패칭
  const handleRefetch = useCallback(async () => {
    queryClient.removeQueries(queryKey.photoKeys.all);
    refetch();
  }, [queryClient, refetch]);
  useUpdateEffect(() => {
    handleRefetch();
  }, [filter]);

  return (
    <section className="item-section">
      {photos?.pages.map((page, pageIdx) => 
      <Fragment key={pageIdx}>
        {page?.photos.map((item) => (
          <PhotoCard key={item.photocard_id} photo={item} icon={icon} handleClickIcon={handleClickIcon} />
        ))}
      </Fragment>)}

      {isFetching && Array.from({length: 20}).map((_, idx) => (
        <SkeletonPhotoCard key={idx} />
      ))}

      <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </section>
  );
}

export default PhotoList;