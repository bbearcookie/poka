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

function Success({ trade }: Props) {
  return (
    <>
      <PhotoInfoCard
        photoName={trade.photo.name}
        groupName={trade.photo.groupData.name}
        memberName={trade.photo.memberData.name}
        imageName={trade.photo.imageName}
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