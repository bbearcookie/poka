import React, { useState, Fragment } from 'react';
import { useUpdateEffect } from 'react-use';
import { useQueryClient } from '@tanstack/react-query';
import * as queryKey from '@api/queryKey';
import usePhotosQuery, { FilterType } from '@api/query/photo/usePhotosQuery';
import NextPageFetcher from '@component/list/content/NextPageFetcher';
import PhotocardItem from '@component/photocard/new/item/PhotocardItem';
import SkeletonPhotoCardItem from '@component/photocard/new/item/SkeletonPhotocardItem';
import { IconType } from '@type/icon';
import { State as FilterState } from '@component/search/content/filter/reducer';
import { State as KeywordState } from '@component/search/content/keyword/reducer';
import { ItemSection } from '@component/list/content/_styles';

interface Props {
  filter: FilterState;
  keyword: KeywordState;
  icon?: IconType;
  handleSelect?: (photocardId: number) => void;
}

function PhotoList({ filter, keyword, icon, handleSelect }: Props) {
  const queryClient = useQueryClient();
  const [refine, setRefine] = useState<FilterType>({
    groupIds: [],
    memberIds: [],
    photoNames: [],
  });

  const {
    data: photos,
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = usePhotosQuery(refine, { enabled: filter.initialized });

  // 데이터 리패칭
  useUpdateEffect(() => {
    queryClient.removeQueries(queryKey.photoKeys.all);
    refetch();
  }, [refine]);

  // 검색 조건 변경시 새로운 필터 적용
  useUpdateEffect(() => {
    setRefine({
      groupIds: filter.groups.filter((g) => g.checked).map((g) => g.id),
      memberIds: filter.members.filter((m) => m.checked).map((m) => m.id),
      photoNames: keyword.keywords
        .filter((k) => k.category === 'photoName')
        .map((k) => k.value),
    });
  }, [filter, keyword]);

  return (
    <ItemSection>
      {photos?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.photos.map((p) => (
            <PhotocardItem
              {...p}
              key={p.photocardId}
              icon={icon}
              onClick={handleSelect}
            />
          ))}
        </Fragment>
      ))}

      {isFetching &&
        Array.from({ length: 20 }).map((_, i) => (
          <SkeletonPhotoCardItem key={i} />
        ))}

      <NextPageFetcher
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </ItemSection>
  );
}

export default PhotoList;
