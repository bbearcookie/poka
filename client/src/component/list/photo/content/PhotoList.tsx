import React, { Fragment, useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import { useQueryClient } from '@tanstack/react-query';
import { IconType } from '@type/icon';
import * as queryKey from '@api/queryKey';
import ItemSection from '@component/list/ItemSection';
import PhotoCard from '@component/photocard/photo/PhotoCard';
import SkeletonPhotoCard from '@component/photocard/photo/SkeletonPhotoCard';
import usePhotosQuery from '@api/query/photo/usePhotosQuery';
import NextPageFetcher from '@component/list/NextPageFetcher';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  icon?: IconType;
  handleClickIcon?: (photocardId: number) => void;
}
const DefaultProps = {};

function PhotoList({ state, dispatch, icon, handleClickIcon }: Props) {
  const queryClient = useQueryClient();

  // 데이터 가져오기
  const { data: photos, refetch, isFetching, fetchNextPage, hasNextPage }
  = usePhotosQuery(state);

  // 검색 필터 변경시 데이터 리패칭
  const handleRefetch = useCallback(async () => {
    queryClient.removeQueries(queryKey.photoKeys.all);
    refetch();
  }, [queryClient, refetch]);
  useUpdateEffect(() => {
    handleRefetch();
  }, [state]);

  return (
    <ItemSection>
      {photos?.pages.map((page, pageIdx) => 
      <Fragment key={pageIdx}>
        {page?.photos.map((item) => (
          <PhotoCard
            key={item.photocardId}
            photocardId={item.photocardId}
            photoName={item.name}
            groupName={item.groupName}
            memberName={item.memberName}
            imageName={item.imageName}
            icon={icon}
            handleClickIcon={handleClickIcon}
          />
        ))}
      </Fragment>)}

      {isFetching && Array.from({length: 20}).map((_, idx) => (
        <SkeletonPhotoCard key={idx} />
      ))}

      <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </ItemSection>
  );
}

export default PhotoList;