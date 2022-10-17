import React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PhotoType } from '@api/photoAPI';
import IconButton from '@component/form/IconButton';
import PhotoCardTemplate from '@component/photocard/PhotoCardTemplate';

interface PhotoCardProps {
  photo: PhotoType;
  icon?: IconDefinition;
  handleClickIcon?: (photocardId: number) => void;
  children?: React.ReactNode;
}
const PhotoCardDefaultProps = {
  handleClickIcon: (photocardId: number) => {}
};

function PhotoCard({ photo, icon, handleClickIcon, children }: PhotoCardProps & typeof PhotoCardDefaultProps) {
  return (
    <PhotoCardTemplate
      className="PhotoCard"
      photo={photo}
      iconNode={icon && <IconButton icon={icon} size="lg" onClick={() => handleClickIcon(photo.photocard_id)} />}
    >
      {children}
    </PhotoCardTemplate>
  );
}

PhotoCard.defaultProps = PhotoCardDefaultProps;
export default PhotoCard;