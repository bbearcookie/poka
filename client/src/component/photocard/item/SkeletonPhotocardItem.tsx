import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import { PhotoName, StylesPhotocardItem } from './_styles';

interface Props {
  children?: React.ReactNode;
}

function SkeletonPhotocardItem({ children }: Props) {
  return (
    <StylesPhotocardItem>
      <main className="main">
        <SkeletonItem styles={{ width: '9.375em', height: '14em' }} />
        <PhotoName />
        <section className="info-section">
          <section className="member-section">
            <SkeletonItem
              className="member-name"
              styles={{ height: '1.312em' }}
            />
            <SkeletonItem styles={{ margin: '0.4em 0 0.4em 0', height: '1.312em' }} />
          </section>
        </section>
      </main>

      {children && <footer className="footer">{children}</footer>}
    </StylesPhotocardItem>
  );
}

export default SkeletonPhotocardItem;
