import React, { useCallback } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PhotoType } from '@type/photo';
import IconButton from '@component/form/IconButton';
import PhotoCardTemplate from '@component/photocard/PhotoCardTemplate';
import { StylesProps } from '@component/card/basic/Card';

interface Props {
  photocardId: number;
  photoName: string;
  memberName: string;
  groupName: string;
  imageName: string;
  icon?: IconDefinition;
  handleClickIcon?: (photocardId: number) => void;
  cardStyles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {
  handleClickIcon: (photocardId: number) => {}
};

function PhotoCard({
  photocardId, photoName, groupName, memberName, imageName, icon,
  handleClickIcon = DefaultProps.handleClickIcon,
  cardStyles,
  children
}: Props) {

  const onClick = useCallback(() => {
    handleClickIcon(photocardId)
  }, [handleClickIcon, photocardId]);

  return (
    <PhotoCardTemplate
      className="PhotoCard"
      photoName={photoName}
      groupName={groupName}
      memberName={memberName}
      imageName={imageName}
      iconNode={icon && <IconButton icon={icon} size="lg" onClick={onClick} />}
      cardStyles={cardStyles}
    >
      {children}
    </PhotoCardTemplate>
  );
}

export default PhotoCard;