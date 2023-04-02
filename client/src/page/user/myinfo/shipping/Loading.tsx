import React from 'react';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import { Card, CardHeader } from '@component/card/new/Card';
import SkeletonAddress from '@component/shipping/address/item/SkeletonAddress';

function Loading() {
  return (
    <Card>
      <CardHeader>
        <TitleLabel title="배송 정보" />
      </CardHeader>
      {Array.from({ length: 5 }).map((_, idx) => (
        <SkeletonAddress key={idx} />
      ))}
    </Card>
  );
}

export default Loading;
