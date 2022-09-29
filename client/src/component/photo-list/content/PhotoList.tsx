import React, { Fragment, useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import { useAppSelector } from '@app/redux/reduxHooks';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/commonAPI';
import * as queryKey from '@util/queryKey';
import * as photoAPI from '@api/photoAPI';
import { PhotoType } from '../basic/PhotoCard';
import PhotoCard from '../basic/PhotoCard';
import SkeletonPhotoCard from '../basic/SkeletonPhotoCard';
import { FilterType } from '../photoListCardSlice';

interface PhotoListProps {
  icon?: IconDefinition;
  handleClickIcon?: (photo: PhotoType) => void;
  children?: React.ReactNode;
}
const PhotoListDefaultProps = {};

function PhotoList({ icon, handleClickIcon, children }: PhotoListProps & typeof PhotoListDefaultProps) {
  const filter = useAppSelector((state) => state.photoListCard.filter);
  const [viewRef, inView] = useInView();
  const limit = 20; // 한 페이지에 보여줄 아이템 갯수
  const queryClient = useQueryClient();

  // 데이터 가져오기
  const { data: photos, error, refetch, isFetching, fetchNextPage, hasNextPage } = 
  useInfiniteQuery<typeof photoAPI.getPhotoList.resType, AxiosError<ErrorType>>
  (queryKey.photoKeys.all,
  ({ pageParam = 0 }) => photoAPI.getPhotoList.axios(limit, pageParam, filter as FilterType),
  {
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.photos.length === limit && lastPage.pageParam + limit;
    },
    refetchOnWindowFocus: false,
  });

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
    <section className="photo-section">
      {photos?.pages.map((page, pageIdx) => 
        <Fragment key={pageIdx}>
          {page?.photos.map((item) => (
            <PhotoCard key={item.photocard_id} photo={item} icon={icon} handleClickIcon={handleClickIcon} />
          ))}
        </Fragment>
      )}

      {isFetching && Array.from({length: limit}).map((_, idx) => (
        <SkeletonPhotoCard key={idx} />
      ))}

      <div ref={viewRef} />
    </section>
  );
}

PhotoList.defaultProps = PhotoListDefaultProps;
export default PhotoList;