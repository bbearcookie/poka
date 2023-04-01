import React from 'react';
import * as queryKey from '@api/queryKey';
import { useQueries } from '@tanstack/react-query';
import { fetchPhotoDetail } from '@api/api/photo';
import { ResType } from '@api/query/photo/usePhotoQuery';
import { State, Action } from '@component/trade/editor/reducer';
import InputMessage from '@component/form/InputMessage';
import PhotoList from './PhotoList';
import Amount from './Amount';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function CardContents({ state, dispatch }: Props) {
  const photos = useQueries({
    queries: state.data.wantPhotocardIds.map(photocardId => ({
      queryKey: queryKey.photoKeys.detail(photocardId),
      queryFn: async () => {
        return (await fetchPhotoDetail(photocardId)) as Promise<ResType>;
      },
    })),
  });

  if (photos.length <= 0)
    return (
      <InputMessage styles={{ margin: '0 0 0.5em 0' }}>
        {state.message.wantPhotocardIds}
      </InputMessage>
    );

  return (
    <>
      <b className="label">종류</b>
      <PhotoList photos={photos} dispatch={dispatch} />
      {state.message.wantPhotocardIds && (
        <InputMessage styles={{ margin: '0 0 0.5em 0' }}>
          {state.message.wantPhotocardIds}
        </InputMessage>
      )}
      <Amount state={state} dispatch={dispatch} />
    </>
  );
}

export default CardContents;
