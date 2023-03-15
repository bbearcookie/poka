import React from 'react';
import useSearcher from '@component/search/useSearcher';
import Searcher from '@component/search/Searcher';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import ShippingList from '@component/list/shipping/ShippingList';

function ShippingSection() {
  const { filter, keyword, filterDispatch, keywordDispatch } = useSearcher();

  return (
    <Card>
      <CardHeader styles={{ padding: "1em 1em 0 1em"}}>
        <Searcher
          category={{
            userName: "사용자 아이디"
          }}
          options={{
            shippingState: true,
            paymentState: true
          }}
          filter={filter}
          filterDispatch={filterDispatch}
          keyword={keyword}
          keywordDispatch={keywordDispatch}
        />
      </CardHeader>
      <CardBody styles={{ padding: "0" }}>
        <ShippingList filter={filter} keyword={keyword} to="/admin/shipping/detail" />
      </CardBody>
    </Card>
  );
}

export default ShippingSection;