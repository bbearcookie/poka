import { useState, Fragment, useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import usePhotosQuery, { FilterType } from '@api/query/photo/usePhotosQuery';
import NextPageFetcher from '@component/list/content/NextPageFetcher';
import PhotocardItem from '@component/photocard/item/PhotocardItem';
import SkeletonPhotoCardItem from '@component/photocard/item/SkeletonPhotocardItem';
import { IconType } from '@type/icon';
import { ItemSection } from '@component/list/content/_styles';
import { SearcherHook } from '@component/search/hook/useSearcher';

interface Props {
  hook: SearcherHook;
  icon?: IconType;
  handleSelect?: (photocardId: number) => void;
}

function PhotoList({ hook, icon, handleSelect = () => {} }: Props) {
  const { filter, keyword, initialized } = hook;

  const makeRefindFilter = useCallback(
    (): FilterType => ({
      groupIds: filter.groups.filter(g => g.checked).map(g => g.id),
      memberIds: filter.members.filter(m => m.checked).map(m => m.id),
      photoNames: keyword.keywords.filter(k => k.category === 'photoName').map(k => k.value),
    }),
    [filter, keyword]
  );

  const [refine, setRefine] = useState<FilterType>(makeRefindFilter());

  const { data: photos, isFetching, hasNextPage, fetchNextPage } = usePhotosQuery(refine, { enabled: initialized });

  // 검색 조건 변경시 새로운 필터 적용
  useUpdateEffect(() => {
    if (!initialized) return;
    setRefine(makeRefindFilter());
  }, [filter, keyword]);

  return (
    <ItemSection templateColumnsSize="minmax(11.25em, 1fr)">
      {photos?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.photos.map(p => (
            <PhotocardItem {...p} key={p.photocardId} icon={icon} handleClick={() => handleSelect(p.photocardId)} />
          ))}
        </Fragment>
      ))}

      {isFetching && Array.from({ length: 20 }).map((_, i) => <SkeletonPhotoCardItem key={i} />)}
      <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </ItemSection>
  );
}

export default PhotoList;
