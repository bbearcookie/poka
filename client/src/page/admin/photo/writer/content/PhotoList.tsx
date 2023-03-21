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

function PhotoList({ state, dispatch }: Props) {
  return (
    <section>
      <Card styles={{ marginBottom: "2em" }}>
        <CardBody>
          <h1 className="title">등록할 포토카드 정보</h1>
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
    </section>
  );
}

export default PhotoList;