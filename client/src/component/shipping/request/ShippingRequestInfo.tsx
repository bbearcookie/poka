import React from 'react';
import Card, { StylesProps as CardStyles } from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardList from '@component/card/basic/CardList';
import CardListItem from '@component/card/basic/CardListItem';
import UserProfile from '@component/profile/UserProfile';
import Address from '@component/shipping/address/item/Address';
import { getFormattedTime } from '@util/date';
import StateLabel from '@component/label/stateLabel/StateLabel';
import { ShippingRequestDetail } from '@type/shipping';

interface Props {
  shipping: ShippingRequestDetail;
  cardStyles?: CardStyles;
}

function ShippingRequestInfo({ shipping, cardStyles }: Props) {
  return (
    <Card styles={cardStyles}>
      <CardHeader>
        <h1 className="title">배송요청 정보</h1>
      </CardHeader>

      <CardListItem title="배송상태">
        <StateLabel
          state={{ type: 'shipping', key: shipping.state }}
          styles={{ width: '6em', margin: '0 0.5em 0.2em 0' }}
        />
        {shipping.state === 'waiting' && (
          <p className="description">관리자의 처리를 기다리는 상태입니다.</p>
        )}
        {shipping.state === 'shipped' && (
          <p className="description">관리자가 포토카드를 발송한 상태입니다.</p>
        )}
      </CardListItem>

      <CardListItem title="결제상태">
        <StateLabel
          state={{ type: 'payment', key: shipping.payment.state }}
          styles={{ width: '6em', margin: '0 0.5em 0.2em 0' }}
        />
        {shipping.payment.state === 'waiting' && (
          <p className="description">아직 배송비를 결제하지 않은 상태입니다.</p>
        )}
        {shipping.payment.state === 'paid' && (
          <p className="description">배송비를 정상적으로 결제한 상태입니다.</p>
        )}
        {shipping.payment.state === 'forgeried' && (
          <p className="description">결제가 위조되었거나 문제가 발생한 상태입니다.</p>
        )}
      </CardListItem>

      <CardList>
        <CardListItem title="요청자">
          <UserProfile {...shipping.author} />
        </CardListItem>
        <CardListItem title="배송주소">
          <Address {...shipping.address} />
        </CardListItem>
        <CardListItem title="요청일">
          <p className="description">{getFormattedTime(new Date(shipping.writtenTime))}</p>
        </CardListItem>
      </CardList>
    </Card>
  );
}

export default ShippingRequestInfo;
