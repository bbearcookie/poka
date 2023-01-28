import React from 'react';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { PhotoType } from '@type/photo';
import Button from '@component/form/Button';
import PhotoInfoCard from '@component/photocard/photo/PhotoInfoCard';

interface Props {
  photo: PhotoType;
  startEditor: () => void;
}
const DefaultProps = {};

function PhotoInfo({ photo, startEditor }: Props) {
  return (
    <PhotoInfoCard
      photoName={photo.name}
      groupName={photo.groupName}
      memberName={photo.memberName}
      imageName={photo.imageName}
      cardStyles={{ margin: "0 auto 5em auto" }}
    >
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