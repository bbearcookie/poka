import React from 'react';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import ShippingSection from './content/ShippingSection';
import './Index.scss';

interface Props {}

function Index({  }: Props) {
  return (
    <main className="AdminShippingListPage">
      <TitleLabel title="배송요청 목록" styles={{ marginBottom: "1em" }} />
      <ShippingSection />
    </main>
  );
}

export default Index;