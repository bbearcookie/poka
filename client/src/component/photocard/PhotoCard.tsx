import React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PhotoType } from '@api/photoAPI';
import IconButton from '@component/form/IconButton';
import PhotoCardTemplate from '@component/photocard/PhotoCardTemplate';
import { StylesProps } from '@component/card/basic/Card';

interface Props {
  photo: PhotoType;
  icon?: IconDefinition;
  handleClickIcon?: (photocardId: number) => void;
  cardStyles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {
  handleClickIcon: (photocardId: number) => {}
};

function PhotoCard({
  photo, icon,
  handleClickIcon = DefaultProps.handleClickIcon,
  cardStyles,
  children
}: Props) {
  return (
    <PhotoCardTemplate
      className="PhotoCard"
      photo={photo}
      iconNode={icon && <IconButton icon={icon} size="lg" onClick={() => handleClickIcon(photo.photocard_id)} />}
      cardStyles={cardStyles}
    >
      {children}
    </PhotoCardTemplate>
  );
}

export default PhotoCard;