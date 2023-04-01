import React, { useCallback } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import PhotocardItem from '@component/photocard/item/PhotocardItem';
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
      dispatch({ type: 'REMOVE_WANT_PHOTOCARD_ID', payload: photocardId });
    },
    [dispatch]
  );

  return (
    <ItemSection templateColumnsSize="minmax(11.25em, 1fr)" margin="1em 0">
      {photos.map(photo =>
        photo.status === 'success' ? (
          <PhotocardItem
            {...photo.data}
            key={photo.data.photocardId}
            icon={{ svg: faClose, tooltip: '취소' }}
            onClick={removePhoto}
          />
        ) : (
          <></>
        )
      )}
    </ItemSection>
  );
}

export default PhotoList;
