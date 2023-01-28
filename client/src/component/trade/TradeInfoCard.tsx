import React from 'react';
import styled, { css } from 'styled-components';
import useUserQuery from '@api/query/user/useUserQuery';
import { ResType as TradeType } from '@api/query/trade/useTradeQuery';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import CardHeader from '@component/card/basic/CardHeader';
import CardList from '@component/card/basic/CardList';
import CardListItem from '@component/card/basic/CardListItem';
import SkeletonUserProfile from '@component/profile/SkeletonUserProfile';
import UserProfile from '@component/profile/UserProfile';
import { getFormattedTime } from '@util/date';
import { TradeStateKey, TradeStateValue } from '@/type/trade';

interface Props {
  trade: TradeType;
}
const DefaultProps = {};

function TradeInfoCard({ trade }: Props) {
  const { data: user, status } = useUserQuery(trade.userId);

  return (
    <Card className="TradeInfoCard" styles={{ marginBottom: "5em" }}>
      <CardHeader><h1 className="title">교환글 정보</h1></CardHeader>
      <CardList>
        <CardListItem title="작성자" styles={{ color: "#65748b" }}>
          {status === 'success' && <UserProfile username={user.username} nickname={user.nickname} imageName={user.imageName} />}
          {status === 'loading' && <SkeletonUserProfile />}
        </CardListItem>
        <CardListItem title="교환 상태" styles={{ color: "#65748b" }}>
          <TradeStateLabel state={trade.state}>{TradeStateValue[trade.state]}</TradeStateLabel>
        </CardListItem>
        <CardListItem title="작성일" styles={{ color: "#65748b" }}>{getFormattedTime(new Date(trade.writtenTime))}</CardListItem>
        {trade.tradedTime && <CardListItem title="교환일" styles={{ color: "#65748b" }}>{getFormattedTime(new Date(trade.tradedTime))}</CardListItem>}
        <CardListItem title="요구 포토카드 수량" styles={{ color: "#65748b" }}>{trade.amount}장</CardListItem>
      </CardList>
      <CardBody>
        <p className="description">요구 포토카드 수량은 등록자가 올린 포토카드로 교환하기 위해서 등록자에게 얼마나 많은 포토카드를 줘야 하는지를 나타냅니다.</p>
        <p className="description">교환자는 등록자가 받기로 설정한 하단의 포토카드 중에서 자신이 소유한 포토카드를 선택하여 교환이 가능합니다.</p>
      </CardBody>
    </Card>
  );
}

interface StateStyles {
  state: TradeStateKey;
}
const TradeStateLabel = styled.p<StateStyles>`
  width: 6em;
  margin: 0;
  padding: 0.3em;
  text-align: center;
  display: inline-block;
  border-radius: 5px;

  ${(p) => {
    switch (p.state.toLowerCase()) {
      case 'trading':
        return css` background-color: #14B8A6; color: white; `
      case 'traded':
        return css` background-color: #D14343; color: white; `
      default:
        return css``
    }
  }}
`

export default TradeInfoCard;