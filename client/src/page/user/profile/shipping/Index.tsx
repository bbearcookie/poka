import React from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';

interface IndexProps {
  userId: number;
  children?: React.ReactNode;
}
const IndexDefaultProps = {};

function Index({ userId, children }: IndexProps & typeof IndexDefaultProps) {
  return (
    <Card>
      <CardHeader>
        <h1>배송 정보</h1>
      </CardHeader>
      <CardBody>
        여기에 배송지 어떻게 보여줄건지 생각..
      </CardBody>
    </Card>
  );
}

Index.defaultProps = IndexDefaultProps;
export default Index;