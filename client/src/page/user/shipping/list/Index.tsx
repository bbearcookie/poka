import React from 'react';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import './Index.scss';
import ShippingSection from './ShippingSection';

function Index() {
  return (
    <main className="ShippingListPage">
      <TitleLabel title="배송요청 목록" styles={{ marginBottom: "1em" }} />
      <ShippingSection />
    </main>
  );
}

export default Index;