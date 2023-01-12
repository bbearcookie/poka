import React from 'react';
import { ResType as TradeType } from '@api/query/trade/useTradeQuery';
import PhotoInfoCard from '@component/photocard/photo/PhotoInfoCard';
import TradeInfoCard from '@component/trade/TradeInfoCard';
import TradeWantCard from '@component/trade/TradeWantCard';
import TradeRemove from './content/TradeRemove';
import ButtonSection from './content/ButtonSection';

interface Props {
  trade: TradeType;
}
const DefaultProps = {};

function Success({ trade }: Props) {
  return (
    <>
      <PhotoInfoCard
        photoName={trade.photo_name}
        groupName={trade.group_name}
        memberName={trade.member_name}
        imageName={trade.image_name}
        cardStyles={{ margin: "0 auto 5em auto" }}
      />
      <TradeInfoCard trade={trade} />
      <TradeWantCard wantcards={trade.wantcards} />
      <TradeRemove trade={trade} />
      <ButtonSection trade={trade} />
    </>
  );
}

export default Success;