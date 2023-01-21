import React from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import PhotoInfo from './PhotoInfo';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function PhotoList({ state, dispatch }: Props) {
  return (
    <Card styles={{ marginBottom: "2em" }}>
      <CardHeader>
        <h3 className="text">등록하려는 포토카드 목록</h3>
      </CardHeader>

      <CardBody>
        <section className="photo-section">
          {state.form.photos.map((photo) => (
            <PhotoInfo
              key={photo.idx}
              idx={photo.idx}
              src={String(photo.previewURL)}
              message={photo.message}
              state={state}
              dispatch={dispatch}
            />
          ))}
        </section>
      </CardBody>

    </Card>
  );
}

export default PhotoList;