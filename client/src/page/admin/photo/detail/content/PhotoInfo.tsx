import React from 'react';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Photo } from '@type/photo';
import Button from '@component/form/Button';
import PhotoInfoComponent from '@component/photocard/info/PhotoInfo';

interface Props {
  photo: Photo;
  startEditor: () => void;
}

function PhotoInfo({ photo, startEditor }: Props) {
  return (
    <PhotoInfoComponent {...photo} styles={{ margin: '0 auto 5em auto' }}>
      <Button
        rightIcon={faPenToSquare}
        styles={{
          width: 'fit-content',
          theme: 'primary-outlined',
          margin: '1.5em auto 0 auto',
          padding: '0.7em 1.3em',
          iconMargin: '1em',
        }}
        onClick={startEditor}>
        수정
      </Button>
    </PhotoInfoComponent>
  );
}

export default PhotoInfo;
