import React from 'react';
import { Photo } from '@type/photo';
import { photoImage } from '@api/resource';
import { PhotoImg, PhotoName } from '@component/photocard/item/_styles';
import { StyledPhotoInfo } from './_styles';
import { CSSProp } from 'styled-components';

interface Props extends Photo {
  cssProp?: CSSProp;
  children?: React.ReactNode;
}

function PhotoInfo({
  photocardId,
  name,
  imageName,
  groupData,
  memberData,
  cssProp,
  children,
}: Props) {
  return (
    <StyledPhotoInfo css={cssProp}>
      <main className="main">
        <PhotoImg src={photoImage(imageName)} alt="이미지" />
      </main>

      <aside className="aside">
        <PhotoName margin="0 0 1em 0">
          <p className="name">{name}</p>
        </PhotoName>

        <section className="member-section">
          <span className="member-name">
            <b>{memberData.name}</b>
          </span>
          <span className="group-name">{groupData.name}</span>
        </section>

        {children && <footer className="footer">{children}</footer>}
      </aside>
    </StyledPhotoInfo>
  );
}

export default PhotoInfo;
