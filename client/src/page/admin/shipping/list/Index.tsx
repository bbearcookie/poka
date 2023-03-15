import React from 'react';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import useSearcher from '@component/search/useSearcher';
import ShippingSection from './ShippingSection';
import './Index.scss';

function Index() {
  const { filter, keyword, filterDispatch, keywordDispatch } = useSearcher();
  
  return (
    <main className="AdminShippingListPage">
      <TitleLabel title="배송요청 목록" styles={{ marginBottom: "1em" }} />
      <ShippingSection />
    </main>
  );
}

export default Index;