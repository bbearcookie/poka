import React, { useCallback } from 'react';
import { photoImage } from '@api/resource';
import IconButton from '@component/form/IconButton';
import { Photo } from '@type/photo';
import { IconType } from '@type/icon';
import { StylesPhotocardItem, StylesPhotocardItemProps, PhotoName, PhotoImg } from './_styles';

interface Props extends Photo {
  icon?: IconType;
  onClick?: (photocardId: number) => void;
  styles?: StylesPhotocardItemProps;
  children?: React.ReactNode;
}

function PhotocardItem({
  photocardId,
  name,
  imageName,
  groupData,
  memberData,
  icon,
  onClick = () => {},
  styles,
  children
}: Props) {
  const handleClick = useCallback(() => {
    onClick(photocardId);
  }, [photocardId, onClick]);

  return (
    <StylesPhotocardItem {...styles}>
      <main className="main">
        <PhotoImg className="img" src={photoImage(imageName)} alt="이미지" />

        <PhotoName>
          <p className="name">{name}</p>
        </PhotoName>

        <section className="info-section">
          <section className="member-section">
            <span className="member-name">
              <b>{memberData.name}</b>
            </span>
            <span className="group-name">{groupData.name}</span>
          </section>

          <section className="icon-section">
            {icon && (
              <IconButton icon={icon.svg} tooltip={icon.tooltip} size="lg" onClick={handleClick} />
            )}
          </section>
        </section>
      </main>

      {children && <footer className="footer">{children}</footer>}
    </StylesPhotocardItem>
  );
}

export default PhotocardItem;
