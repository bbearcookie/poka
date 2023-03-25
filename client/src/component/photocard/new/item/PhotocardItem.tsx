import React, { useCallback } from 'react';
import { photoImage } from '@api/resource';
import IconButton from '@component/form/IconButton';
import { Photo } from '@type/photo';
import { IconType } from '@type/icon';
import { StylesPhotocardItem } from './_styles';

interface Props extends Photo {
  icon?: IconType;
  onClick?: (photocardId: number) => void;
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
  children,
}: Props) {
  const handleClick = useCallback(() => {
    onClick(photocardId);
  }, [photocardId, onClick]);

  return (
    <StylesPhotocardItem>
      <main className="main">
        <img className="img" src={photoImage(imageName)} alt="이미지" />

        <section className="name-section">
          <p className="name">{name}</p>
        </section>

        <section className="info-section">
          <section className="member-section">
            <span className="member-name">
              <b>{memberData.name}</b>
            </span>
            <span className="group-name">{groupData.name}</span>
          </section>

          <section className="icon-section">
            {icon && (
              <IconButton
                icon={icon.svg}
                tooltip={icon.tooltip}
                size="lg"
                onClick={handleClick}
              />
            )}
          </section>
        </section>
      </main>

      {children && <footer className="footer">{children}</footer>}
    </StylesPhotocardItem>
  );
}

export default PhotocardItem;
