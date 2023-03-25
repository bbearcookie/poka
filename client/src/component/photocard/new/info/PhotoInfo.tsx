import React from 'react';
import { Photo } from '@type/photo';
import { photoImage } from '@api/resource';
import { PhotoImg, PhotoImgStyles, PhotoName } from '../item/_styles';
import { StyledPhotoInfo, PhotoInfoStyles } from './_styles';

interface Props extends Photo {
  imgStyles?: PhotoImgStyles;
  styles?: PhotoInfoStyles;
  children?: React.ReactNode;
}

function PhotoInfo({
  photocardId,
  name,
  imageName,
  groupData,
  memberData,
  imgStyles,
  styles,
  children,
}: Props) {
  return (
    <StyledPhotoInfo {...styles}>
      <section className="image-section">
        <PhotoImg {...imgStyles} src={photoImage(imageName)} alt="이미지" />
      </section>

      <section className="name-section">
        <PhotoName width="9.5em" margin="0.15em 0">
          <p className="name">{name}</p>
        </PhotoName>

        <section className="info-section">
          <p className="member-name">
            <b>{memberData.name}</b>
          </p>

          <p className="group-name">
            그룹: <span className="group-label">{groupData.name}</span>
          </p>
        </section>

        {children}
      </section>
    </StyledPhotoInfo>
  );
}

export default PhotoInfo;
