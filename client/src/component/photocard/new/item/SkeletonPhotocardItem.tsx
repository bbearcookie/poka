import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import { StylesPhotocardItem } from './_styles';

interface Props {
  children?: React.ReactNode;
}

function SkeletonPhotocardItem({ children }: Props) {
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

      {children && <footer className="footer">{children}</footer>}
    </StylesPhotocardItem>
  );
}

export default SkeletonPhotocardItem;
