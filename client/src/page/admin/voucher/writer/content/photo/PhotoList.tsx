import React from 'react';
import { useQueries } from '@tanstack/react-query';
import * as queryKey from '@api/queryKey';
import { fetchPhotoDetail } from '@api/api/photo';
import SkeletonPhotoCard from '@component/photocard/skeleton/SkeletonPhotoCard';
import { State, Action } from '../../reducer';
import { PhotoItemType } from './PhotoItem';
import PhotoItem from './PhotoItem';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function PhotoList({ state, dispatch }: Props) {
  const photos = useQueries({
    queries: state.form.vouchers.map((item) => ({
      queryKey: queryKey.photoKeys.detail(item.photocardId),
      queryFn: async () => {
        const data = await fetchPhotoDetail(item.photocardId)
        return { ...data, id: item.id } as Promise<PhotoItemType>
      } 
    }))
  });

  return (
    <section className="PhotoList">
      {photos.map((photo, idx) => {
        if (photo.data) return <PhotoItem key={idx} photo={photo.data} idx={idx} state={state} dispatch={dispatch} />
        else return <SkeletonPhotoCard key={idx}></SkeletonPhotoCard>
      })}
    </section>
  );
}

export default PhotoList;