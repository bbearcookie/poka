import TitleLabel from '@component/label/TitleLabel';
import { Card, CardHeader } from '@component/card/basic/_styles';
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
