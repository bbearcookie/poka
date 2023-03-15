import React, { useEffect } from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import useSearcher from '@component/search/useSearcher';
import Searcher from '@component/search/Searcher';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import ShippingList from '@component/list/shipping/ShippingList';

function ShippingSection() {
  const { filter, keyword, filterDispatch, keywordDispatch } = useSearcher();
  const username = useAppSelector(state => state.auth.username);

  // 로그인 한 사용자의 배송 요청만 보이도록 기본 키워드 추가
  useEffect(() => {
    keywordDispatch({
      type: 'ADD_KEYWORD',
      value: { category: 'userName', title: '작성자', value: username, show: false }
    });
  }, [username, keywordDispatch]);

  return (
    <Card>
      <CardHeader styles={{ padding: "1em 1em 0 1em"}}>
        <Searcher
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
        <ShippingList filter={filter} keyword={keyword} to="/shipping/detail" />
      </CardBody>
    </Card>
  );
}

export default ShippingSection;