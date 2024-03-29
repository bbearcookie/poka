import React from 'react';
import { Card, CardBody } from '@component/card/basic/_styles';
import PhotoInfo from './PhotoInfo';
import { State, Action } from '../reducer';
import { PhotoSection } from './_styles';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function PhotoList({ state, dispatch }: Props) {
  return (
    <Card className="PhotoList">
      <CardBody>
        <h1 className="title">등록할 포토카드 정보</h1>
        <PhotoSection>
          {state.form.photos.map(photo => (
            <PhotoInfo
              key={photo.idx}
              idx={photo.idx}
              src={String(photo.previewURL)}
              message={photo.message}
              state={state}
              dispatch={dispatch}
            />
          ))}
        </PhotoSection>
      </CardBody>
    </Card>
  );
}

export default PhotoList;
