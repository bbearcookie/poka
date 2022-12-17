import React from 'react';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { PhotoType } from '@api/photoAPI';
import Button from '@component/form/Button';
import PhotoInfoCard from '@component/photocard/detail/PhotoInfoCard';

interface Props {
  photo: PhotoType;
  startEditor: () => void;
}
const DefaultProps = {};

function PhotoInfo({ photo, startEditor }: Props) {
  return (
    <PhotoInfoCard photo={photo}>
      <Button
        rightIcon={faPenToSquare}
        styles={{
          width: "fit-content",
          theme: "primary-outlined",
          margin: "1.5em auto 0 auto",
          padding: "0.7em 1.3em",
          iconMargin: "1em"
        }}
        onClick={startEditor}
      >수정</Button>
    </PhotoInfoCard>
  );
}

export default PhotoInfo;