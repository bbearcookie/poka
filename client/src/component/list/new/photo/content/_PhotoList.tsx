import React, { useState, Fragment } from 'react';
import { useUpdateEffect } from 'react-use';
import { useQueryClient } from '@tanstack/react-query';
import usePhotosQuery, { FilterType } from '@api/query/photo/useNewPhotosQuery';
import * as queryKey from '@api/queryKey';
import NextPageFetcher from '@component/list/NextPageFetcher';
import PhotoCard from '@component/photocard/photo/PhotoCard';
import SkeletonPhotoCard from '@component/photocard/photo/SkeletonPhotoCard';
import { IconType } from '@type/icon';
import { State as FilterState } from '@component/search/content/filter/reducer';
import { State as KeywordState } from '@component/search/content/keyword/reducer';
import { ItemSection } from '@component/list/new/_styles';

interface Props {
  filter: FilterState;
  keyword: KeywordState;
  icon?: IconType;
  handleSelect?: (photocardId: number) => void;
}

function PhotoList({ filter, keyword, icon, handleSelect }: Props) {
  const queryClient = useQueryClient();
  const [refine, setRefine] = useState<FilterType>({
    groupId: [],
    memberId: [],
    photoName: []
  });

  const { data: photos, isFetching, hasNextPage, fetchNextPage, refetch }
  = usePhotosQuery(refine);

  // 데이터 리패칭
  useUpdateEffect(() => {
    queryClient.removeQueries(queryKey.photoKeys.all);
    refetch();
  }, [refine]);

  // 검색 조건 변경시 새로운 필터 적용
  useUpdateEffect(() => {
    setRefine({
      groupId: filter.groups.filter(g => g.checked).map(g => g.id),
      memberId: filter.members.filter(m => m.checked).map(m => m.id),
      photoName: keyword.keywords.filter(k => k.type === 'photoName').map(k => k.value)
    });
  }, [filter, keyword]);

  return (
    <ItemSection>
      {photos?.pages.map((page, i) =>
      <Fragment key={i}>
        {page.photos.map(photo =>
        <PhotoCard
          key={photo.photocardId}
          photocardId={photo.photocardId}
          photoName={photo.name}
          groupName={photo.groupName}
          memberName={photo.memberName}
          imageName={photo.imageName}
          icon={icon}
          handleClick={handleSelect}
        />)}
      </Fragment>)}

      {isFetching && Array.from({length: 20}).map((_, i) => <SkeletonPhotoCard key={i} />)}

      <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </ItemSection>
  );
}

export default PhotoList;