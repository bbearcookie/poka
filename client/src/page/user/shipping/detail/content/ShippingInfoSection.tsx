import React from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import CardList from '@component/card/basic/CardList';
import CardListItem from '@component/card/basic/CardListItem';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';

interface Props {
  res: ResType
}
const DefaultProps = {};

function ShippingInfoSection({ res }: Props) {
  return (
    <Card>
      <CardHeader>
        <h1 className="title">배송요청 정보</h1>
      </CardHeader>
      <CardList styles={{ borderBottom: "1px solid #E5E7EB" }}>
        <CardListItem title="배송상태" styles={{ borderBottom: "none" }}>ㅎㅎ</CardListItem>
        <CardBody styles={{ padding: "0 1.5em 1.5em 1.5em"}}>
          <p className="description">[대기중] 관리자의 처리를 기다리는 상태입니다.</p>
          <p className="description">[배송완료] 사용자의 요청대로 관리자가 배송 완료한 상태입니다.</p>
        </CardBody>
      </CardList>
        {/* <CardList>
          <CardListItem title="배송상태"></CardListItem>
          <CardListItem title="결제상태">ㅇㅇ</CardListItem>
          <CardListItem title="요청자">ㅇㅇ</CardListItem>
          <CardListItem title="배송주소">ㅇㅇ</CardListItem>
          <CardListItem title="요청일">ㅇㅇ</CardListItem>
        </CardList> */}
    </Card>
  );
}

export default ShippingInfoSection;