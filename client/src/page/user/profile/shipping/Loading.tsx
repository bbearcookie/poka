import React from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import SkeletonAddress from '@component/address/SkeletonAddress';

interface Props {}
const DefaultProps = {};

function Loading({  }: Props) {
  return (
    <Card styles={{ marginBottom: "5em" }}>
      <CardHeader>
        <h1 className="subtitle-label">배송 정보</h1>
      </CardHeader>
      <CardBody styles={{ padding: "0" }}>
        {Array.from({ length: 5 }).map((_, idx) => <SkeletonAddress key={idx} />)}
      </CardBody>
    </Card>
  );
}

export default Loading;