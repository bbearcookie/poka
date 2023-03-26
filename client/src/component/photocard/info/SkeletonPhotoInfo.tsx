import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import { PhotoImg, PhotoImgStyles, PhotoName } from '../item/_styles';
import { StyledPhotoInfo, PhotoInfoStyles } from './_styles';

interface Props {
  imgStyles?: PhotoImgStyles;
  styles?: PhotoInfoStyles;
}

function SkeletonPhotoInfo({ imgStyles, styles }: Props) {
  return (
    <StyledPhotoInfo {...styles}>
      <section className="image-section">
        <SkeletonItem
          styles={{
            width: imgStyles?.size ? `${9.375 * imgStyles.size}em` : `9.375em`,
            height: imgStyles?.size ? `${14 * imgStyles.size}em` : `14em`,
          }}
        />
      </section>
      <section className="name-section">
        <PhotoName width="9.5em" margin="0.15em 0" />
        <section className="info-section">
          <p className="member-name">
            <SkeletonItem styles={{ margin: '0 auto' }} />
          </p>
          <p className="group-name">
            <SkeletonItem styles={{ margin: '0 auto' }} />
          </p>
        </section>
      </section>
    </StyledPhotoInfo>
  );
}

export default SkeletonPhotoInfo;
