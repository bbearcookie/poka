import React from 'react';
import { useQueries } from '@tanstack/react-query';
import * as queryKey from '@api/queryKey';
import { fetchPhotoDetail } from '@api/api/photo';
import SkeletonPhotoCardItem from '@component/photocard/item/SkeletonPhotocardItem';
import { State, Action } from '../../reducer';
import { ItemSection } from '@component/list/content/_styles';
import { PhotoItemType } from './PhotoItem';
import PhotoItem from './PhotoItem';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function PhotoList({ state, dispatch }: Props) {
  const photos = useQueries({
    queries: state.form.vouchers.map((item) => ({
      queryKey: queryKey.photoKeys.detail(item.photocardId),
      queryFn: async () => {
        const data = await fetchPhotoDetail(item.photocardId);
        return { ...data, id: item.id } as Promise<PhotoItemType>;
      },
    })),
  });

  return (
    <ItemSection templateColumnsSize="minmax(11.25em, 1fr)" margin="1em 0">
      {photos.map((photo, idx) => {
        if (photo.data)
          return (
            <PhotoItem
              key={idx}
              photo={photo.data}
              idx={idx}
              state={state}
              dispatch={dispatch}
            />
          );
        else return <SkeletonPhotoCardItem key={idx} />;
      })}
    </ItemSection>
  );
}

export default PhotoList;
