import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import { PhotoName } from '../item/_styles';
import { StyledPhotoInfo, PhotoInfoStyles } from './_styles';

interface Props {
  imgSize?: {
    width: string;
    height: string;
  }
  styles?: PhotoInfoStyles;
}

function SkeletonPhotoInfo({ imgSize, styles }: Props) {
  return (
    <StyledPhotoInfo {...styles}>
      <section className="image-section">
        <SkeletonItem styles={{ ...imgSize }} />
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
