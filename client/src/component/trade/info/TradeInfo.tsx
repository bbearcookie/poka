import { getFormattedTime } from '@util/date';
import { TradeItem } from '@type/trade';
import { TradeStateKey } from '@component/label/stateLabel/_types';
import { CardHeader, CardBody, CardList } from '@component/card/basic/_styles';
import CardListItem from '@component/card/basic/CardListItem';
import StateLabel from '@component/label/stateLabel/StateLabel';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import UserProfile from '@component/profile/UserProfile';
import PhotocardItem from '@component/photocard/item/PhotocardItem';
import { ItemSection } from '@component/list/content/_styles';
import { StyledTradeInfo } from './_styles';

interface Props extends Omit<TradeItem, 'state'> {
  tradeState: TradeStateKey;
}

function TradeInfo({
  tradeId,
  voucher,
  author,
  wantcards,
  tradeState,
  amount,
  tradedTime,
  writtenTime,
}: Props) {
  return (
    <StyledTradeInfo css={{ marginBottom: '5em' }}>
      <CardHeader>
        <TitleLabel title="교환글 정보" />
      </CardHeader>
      <CardList>
        <CardListItem title="작성자">
          <UserProfile {...author} />
        </CardListItem>

        <CardListItem title="교환 상태">
          <StateLabel
            state={{ type: 'trade', key: tradeState }}
            styles={{ width: '6em', margin: '0' }}
          />
        </CardListItem>

        {tradedTime ? (
          <CardListItem title="교환일">{getFormattedTime(new Date(tradedTime))}</CardListItem>
        ) : (
          <CardListItem title="작성일">{getFormattedTime(new Date(writtenTime))}</CardListItem>
        )}

        <CardListItem title="원하는 포토카드 수량">{amount}장</CardListItem>
      </CardList>

      <CardBody>
        <p className="wantcard-label">원하는 포토카드 목록</p>
        <ItemSection templateColumnsSize="minmax(11.25em, 1fr)">
          {wantcards.map(p => (
            <PhotocardItem key={p.photocardId} {...p} />
          ))}
        </ItemSection>
      </CardBody>
    </StyledTradeInfo>
  );
}

export default TradeInfo;
