import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import { PhotoName } from '@component/photocard/item/_styles';
import { StyledPhotoInfo, StyledPhotoInfoProps } from './_styles';

interface Props {
  styles?: StyledPhotoInfoProps;
}

function SkeletonPhotoInfo({ styles }: Props) {
  return (
    <StyledPhotoInfo {...styles}>
      <main className="main">
        <SkeletonItem styles={{ width: '100%', aspectRatio: '214 / 322' }} />
      </main>

      <aside className="aside">
        <PhotoName margin="0 0 1em 0" />

        <section className="member-section">
          <SkeletonItem styles={{ width: '7em', height: '1.5em', margin: '0.25em 0' }} />
          <SkeletonItem styles={{ width: '7em', height: '1.5em', margin: '0.25em 0' }} />
        </section>
      </aside>
    </StyledPhotoInfo>
  );
}

export default SkeletonPhotoInfo;
