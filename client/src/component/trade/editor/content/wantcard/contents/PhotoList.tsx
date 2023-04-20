import React, { useCallback } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import PhotocardItem from '@component/photocard/item/PhotocardItem';
import SkeletonPhotocardItem from '@component/photocard/item/SkeletonPhotocardItem';
import { ItemSection } from '@component/list/content/_styles';
import { ResType } from '@api/query/photo/usePhotoQuery';
import { Action } from '@component/trade/editor/reducer';

interface Props {
  photos: UseQueryResult<ResType, unknown>[];
  dispatch: React.Dispatch<Action>;
}

function PhotoList({ photos, dispatch }: Props) {
  // 받으려는 포토카드에서 제거
  const removePhoto = useCallback(
    (photocardId: number) => {
      dispatch({ type: 'REMOVE_PHOTO', payload: photocardId });
    },
    [dispatch]
  );

  // 어떤 포토카드라도 로딩중이면 스켈레톤 UI 보여줌.
  if (photos.some(p => p.status === 'loading'))
    return (
      <ItemSection templateColumnsSize="minmax(11.25em, 1fr)" margin="1em 0">
        {photos.map((_, idx) => (
          <SkeletonPhotocardItem key={idx} />
        ))}
      </ItemSection>
    );

  // 모든 포토카드 로딩 완료시 일반 UI 보여줌.
  return (
    <ItemSection templateColumnsSize="minmax(11.25em, 1fr)" margin="1em 0">
      {photos.map(
        photo =>
          photo.status === 'success' && (
            <PhotocardItem
              {...photo.data}
              key={photo.data.photocardId}
              icon={{ svg: faClose, tooltip: '취소' }}
              handleClick={() => removePhoto(photo.data.photocardId)}
            />
          )
      )}
    </ItemSection>
  );
}

export default PhotoList;
