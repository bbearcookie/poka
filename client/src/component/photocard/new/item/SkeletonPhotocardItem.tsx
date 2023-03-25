import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import { StylesPhotocardItem } from './_styles';

function SkeletonPhotoCardItem() {
  return (
    <StylesPhotocardItem>
      <main className="main">
        <SkeletonItem className="img" />
        <SkeletonItem className="name-section" />
        <section className="info-section">
          <section className="member-section">
            <SkeletonItem className="member-name" />
            <SkeletonItem styles={{ marginTop: '0.5em' }} />
          </section>
        </section>
      </main>
    </StylesPhotocardItem>
  );
}

export default SkeletonPhotoCardItem;
