import React from 'react';
import { ResType as TradeType } from '@api/query/trade/useTradeQuery';
import PhotoInfoCard from '@component/photocard/photo/PhotoInfoCard';
import TradeInfoCard from '@component/trade/TradeInfoCard';

interface Props {
  trade: TradeType;
}
const DefaultProps = {};

function Success({ trade }: Props) {
  return (
    <>
      <PhotoInfoCard photoName={trade.photo_name} groupName={trade.group_name} memberName={trade.member_name} imageName={trade.image_name} />
      <TradeInfoCard trade={trade} />
    </>
  );
}

export default Success;