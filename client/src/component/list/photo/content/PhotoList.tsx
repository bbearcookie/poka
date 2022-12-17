import React, { Fragment, useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import { useAppSelector } from '@app/redux/reduxHooks';
import { useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as queryKey from '@api/queryKey';
import PhotoCard from '@component/photocard/PhotoCard';
import SkeletonPhotoCard from '@component/photocard/skeleton/SkeletonPhotoCard';
import usePhotosQuery from '@api/query/photo/usePhotosQuery';

interface Props {
  icon?: IconDefinition;
  handleClickIcon?: (photocardId: number) => void;
}
const DefaultProps = {};

function PhotoList({ icon, handleClickIcon }: Props) {
  const filter = useAppSelector((state) => state.photoListCard.filter);
  const [viewRef, inView] = useInView();
  const queryClient = useQueryClient();

  // 데이터 가져오기
  const { data: photos, error, refetch, isFetching, fetchNextPage, hasNextPage } = usePhotosQuery(filter);

  // 다음 페이지 가져오기
  const handleFetchNextPage = useCallback(() => {
    if (!inView) return;
    if (!photos) return;
    if (!hasNextPage) return;
    
    fetchNextPage();
  }, [inView, photos, hasNextPage, fetchNextPage]);
  useUpdateEffect(() => {
    handleFetchNextPage();
  }, [inView]);

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
        </Fragment>
      )}

      {isFetching && Array.from({length: 20}).map((_, idx) => (
        <SkeletonPhotoCard key={idx} />
      ))}

      <div ref={viewRef} />
    </section>
  );
}

export default PhotoList;