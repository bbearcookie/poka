import React, { useCallback } from 'react';
import { IconType } from '@type/icon';
import IconButton from '@component/form/IconButton';
import PhotoCardTemplate from '@component/photocard/PhotoCardTemplate';
import { StylesProps } from '@component/card/basic/Card';

interface Props {
  photocardId: number;
  photoName: string;
  memberName: string;
  groupName: string;
  imageName: string;
  icon?: IconType;
  handleClick?: (photocardId: number) => void;
  cardStyles?: StylesProps;
  children?: React.ReactNode;
}

function PhotoCard({
  photocardId, photoName, groupName, memberName, imageName,
  icon, handleClick = (photocardId: number) => {},
  cardStyles,
  children
}: Props) {

  const onClick = useCallback(() => {
    handleClick(photocardId)
  }, [handleClick, photocardId]);

  return (
    <PhotoCardTemplate
      className="PhotoCard"
      photoName={photoName}
      groupName={groupName}
      memberName={memberName}
      imageName={imageName}
      iconNode={icon && <IconButton icon={icon.svg} tooltip={icon.tooltip} size="lg" onClick={onClick} />}
      cardStyles={cardStyles}
    >
      {children}
    </PhotoCardTemplate>
  );
}

export default PhotoCard;