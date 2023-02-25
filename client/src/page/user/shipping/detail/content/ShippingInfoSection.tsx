import React from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import CardList from '@component/card/basic/CardList';
import CardListItem from '@component/card/basic/CardListItem';
import UserProfile from '@component/profile/UserProfile';
import Address from '@component/address/Address';
import { getFormattedTime } from '@util/date';
import StateLabel, { ShippingStateValue, PaymentStateValue } from '@component/label/StateLabel';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';

interface Props {
  res: ResType;
}
const DefaultProps = {};

function ShippingInfoSection({ res }: Props) {

  return (
    <Card className="ShippingInfoSection">
      <CardHeader>
        <h1 className="title">배송요청 정보</h1>
      </CardHeader>

      <CardList styles={{ borderBottom: "1px solid #E5E7EB" }}>
        <CardListItem title="배송상태" styles={{ borderBottom: "none" }}>
          <StateLabel state={{ type: "shipping", key: res.shipping.requestState}} width="6em" margin="0 0.5em 0.2em 0">
            {ShippingStateValue[res.shipping.requestState]}
          </StateLabel>
        </CardListItem>
        <CardBody styles={{ padding: "0 1.5em 1.5em 1.5em"}}>
          <section className="state-description-section">
            <StateLabel state={{ type: "shipping", key: "waiting"}} width="6em" margin="0 0.5em 0.2em 0">
              {ShippingStateValue.waiting}
            </StateLabel>
            <p className="description">관리자의 처리를 기다리는 상태입니다.</p>
          </section>
          <section className="state-description-section">
            <StateLabel state={{ type: "shipping", key: "shipped"}} width="6em" margin="0 0.5em 0.2em 0">
              {ShippingStateValue.shipped}
            </StateLabel>
            <p className="description">관리자가 포토카드를 발송한 상태입니다.</p>
          </section>
        </CardBody>
      </CardList>

      <CardList styles={{ borderBottom: "1px solid #E5E7EB" }}>
        <CardListItem title="결제상태" styles={{ borderBottom: "none" }}>
          <StateLabel state={{ type: "payment", key: res.shipping.paymentState}} width="6em" margin="0 0.5em 0.2em 0">
            {PaymentStateValue[res.shipping.paymentState]}
          </StateLabel>
        </CardListItem>
        <CardBody styles={{ padding: "0 1.5em 1.5em 1.5em"}}>
          <section className="state-description-section">
            <StateLabel state={{ type: "payment", key: "waiting"}} width="6em" margin="0 0.5em 0.2em 0">
              {PaymentStateValue.waiting}
            </StateLabel>
            <p className="description">아직 배송비를 결제하지 않은 상태입니다.</p>
          </section>
          <section className="state-description-section">
            <StateLabel state={{ type: "payment", key: "paid"}} width="6em" margin="0 0.5em 0.2em 0">
              {PaymentStateValue.paid}
            </StateLabel>
            <p className="description">배송비를 정상적으로 결제한 상태입니다.</p>
          </section>
          <section className="state-description-section">
            <StateLabel state={{ type: "payment", key: "forgeried"}} width="6em" margin="0 0.5em 0.2em 0">
              {PaymentStateValue.forgeried}
            </StateLabel>
            <p className="description">결제가 위조되었거나 문제가 발생한 상태입니다.</p>
          </section>
        </CardBody>
      </CardList>

      <CardList>
        <CardListItem title="요청자">
          <UserProfile
            username={res.shipping.username}
            nickname={res.shipping.nickname}
            imageName={res.shipping.userImageName}
          />
        </CardListItem>
        <CardListItem title="배송주소">
          <Address
            address={res.shipping.address}
            addressDetail={res.shipping.addressDetail}
            contact={res.shipping.contact}
            name={res.shipping.recipient}
            requirement={res.shipping.requirement}
            styles={{ padding: '0' }}
          />
        </CardListItem>
        <CardListItem title="요청일">
          <p className="description">{getFormattedTime(new Date(res.shipping.writtenTime))}</p>
        </CardListItem>
      </CardList>
    </Card>
  );
}

export default ShippingInfoSection;