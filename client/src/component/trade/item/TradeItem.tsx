import React from 'react';
import { PhotoImg } from '@component/photocard/item/_styles';
import PhotocardItem from '@component/photocard/item/PhotocardItem';
import StateLabel from '@component/label/stateLabel/StateLabel';
import UserProfile from '@component/profile/UserProfile';
import { getElaspedTime } from '@util/date';
import { TradeStateKey } from '@component/label/stateLabel/_types';
import { TradeItem as TradeItemType } from '@type/trade';
import { StyledTradeItem, PhotoSection, InfoSection } from './_styles';
import { photoImage } from '@api/resource';

interface Props extends Omit<TradeItemType, 'state'> {
  tradeState: TradeStateKey;
  to?: string;
}

function TradeItem({
  photo,
  author,
  amount,
  tradedTime,
  writtenTime,
  wantcards,
  tradeState,
  to = '#',
}: Props) {
  return (
    <StyledTradeItem to={to}>
      <PhotoSection>
        <PhotocardItem
          {...photo}
          styles={{
            boxShadow: '0',
            border: '1px solid #e5e7eb',
            backgroundColor: 'rgb(248, 248, 248)',
          }}
        >
          <StateLabel state={{ type: 'trade', key: tradeState }} />
          <p className="written-time">{getElaspedTime(new Date(writtenTime))}</p>
        </PhotocardItem>
      </PhotoSection>

      <InfoSection>
        <section className="want-section">
          <p className="want-label">
            <b>아래 카드 중에서 {amount}장이랑 교환하길 원해요!</b>
          </p>
          <section className="images">
            {wantcards.map(cards => (
              <PhotoImg
                key={cards.photocardId}
                width="5em"
                src={photoImage(cards.imageName)}
                alt={cards.name}
              />
            ))}
          </section>
        </section>

        <section className="author-section">
          <h4 className="author-label">등록한 사람</h4>
          <UserProfile {...author} />
        </section>
      </InfoSection>
    </StyledTradeItem>
  );
}

export default TradeItem;
