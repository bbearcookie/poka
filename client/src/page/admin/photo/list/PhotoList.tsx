import React, { Fragment, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/commonAPI';
import * as queryKey from '@util/queryKey';
import * as photoAPI from '@api/photoAPI';
import PhotoCard from './PhotoCard';
import SkeletonPhotoCard from './SkeletonPhotoCard';

interface PhotoListProps {
  children?: React.ReactNode;
}
const PhotoListDefaultProps = {};

function PhotoList({ children }: PhotoListProps & typeof PhotoListDefaultProps) {
  const limit = 20; // 한 페이지에 보여줄 아이템 갯수
  const [viewRef, inView] = useInView();

  // 데이터 가져오기
  const { data: photos, error, isFetching, fetchNextPage, hasNextPage } = 
    useInfiniteQuery<AxiosResponse<typeof photoAPI.getPhotoList.resType>, AxiosError<ErrorType>>
    (queryKey.photoKeys.all, ({ pageParam = 0 }) => photoAPI.getPhotoList.axios(limit, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.data?.photos.length === limit && lastPage.data.pageParam + limit;
      }
    });

  // 다음 페이지 가져오기
  useEffect(() => {
    if (!inView) return;
    if (!photos) return;
    if (!hasNextPage) return;

    fetchNextPage();
    console.log(inView);
  }, [inView]);

  return (
    <>
      <section className="photo-section">
        {photos?.pages.map((page, pageIdx) => 
          <Fragment key={pageIdx}>
            {page?.data?.photos.map((item) => (
              <PhotoCard key={item.photocard_id} photo={item} />
            ))}
          </Fragment>
        )}

        {isFetching && Array.from({length: limit}).map((_, idx) => (
          <SkeletonPhotoCard key={idx} />
        ))}
      </section>
      
      <div ref={viewRef} />
    </>
  );
}

PhotoList.defaultProps = PhotoListDefaultProps;
export default PhotoList;