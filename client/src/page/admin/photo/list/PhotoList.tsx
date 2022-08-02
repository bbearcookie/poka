import React, { Fragment, useCallback } from 'react';
import { useQuery, useInfiniteQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/commonAPI';
import * as queryKey from '@util/queryKey';
import * as photoAPI from '@api/photoAPI';
import { BACKEND, options } from "@util/commonAPI";
import PhotoCard from '@component/card/PhotoCard';

interface PhotoListProps {
  children?: React.ReactNode;
}
const PhotoListDefaultProps = {};

function PhotoList({ children }: PhotoListProps & typeof PhotoListDefaultProps) {
  const limit = 20; // 한 페이지에 보여줄 아이템 갯수

  // 데이터 가져오기
  const { data: photos, error, fetchNextPage, hasNextPage } = 
    useInfiniteQuery<AxiosResponse<typeof photoAPI.getPhotoList.resType>, AxiosError<ErrorType>>
    (queryKey.photoKeys.all, ({ pageParam = 0 }) => photoAPI.getPhotoList.axios(limit, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.data?.photos.length === limit && lastPage.data.pageParam + limit;
      }
    });

  // 다음 페이지 가져오기
  const handleReadMore = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  return (
    <section className="photo-section">
      {photos?.pages.map((page, pageIdx) => 
        <Fragment key={pageIdx}>
          {page?.data?.photos.map((item) => (
            <PhotoCard key={item.photocard_id} photo={item} />
          ))}
        </Fragment>
      )}

      <button onClick={handleReadMore}>Lead More</button>
    </section>
  );
}

PhotoList.defaultProps = PhotoListDefaultProps;
export default PhotoList;