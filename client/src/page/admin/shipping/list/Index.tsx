import React from 'react';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import './Index.scss';

interface Props {

}
const DefaultProps = {};

function Index({  }: Props) {
  return (
    <div className="AdminShippingListPage">
      <h1 className="title-label">배송요청 목록</h1>
      <Card>
        <CardBody>
          아아
        </CardBody>
      </Card>
    </div>
  );
}

export default Index;