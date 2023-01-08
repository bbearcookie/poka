import React from 'react';
import styled from 'styled-components';
import CardBody from '@component/card/basic/CardBody';
import { VoucherStateLabel } from '@component/photocard/VoucherCard';
import { VoucherStateKey, VoucherStateValue } from '@/type/voucher';

interface Props {

}
const DefaultProps = {};

function DescriptionSection({  }: Props) {
  return (
    <CardBody styles={{ color: "#65748b" }}>
      <p className="description">상태는 플랫폼 내에서 발급된 이 소유권의 상태를 나타냅니다.</p>
      <br />
      <StateDescription>
        <VoucherStateLabel
          voucherState="available"
          width="6em"
          textAlign="center"
          margin="0 0.5em 0.2em 0"
        >
          {VoucherStateValue['AVAILABLE']}
        </VoucherStateLabel>
        <span>사용자끼리 교환이 가능한 상태입니다.</span>
      </StateDescription>
      <StateDescription>
        <VoucherStateLabel
          voucherState="trading"
          width="6em"
          textAlign="center"
          margin="0 0.5em 0.2em 0"
        >
          {VoucherStateValue['TRADING']}
        </VoucherStateLabel>
        <span>소유권으로 교환글을 등록한 상태입니다.</span>
      </StateDescription>
      <StateDescription>
        <VoucherStateLabel
          voucherState="shipping"
          width="6em"
          textAlign="center"
          margin="0 0.5em 0.2em 0"
        >
          {VoucherStateValue['SHIPPING']}
        </VoucherStateLabel>
        <span>사용자가 소유권을 실물로 받기 위해 관리자에게 배송요청한 상태입니다.</span>
      </StateDescription>
      <StateDescription>
        <VoucherStateLabel
          voucherState="shipped"
          width="6em"
          textAlign="center"
          margin="0 0.5em 0.2em 0"
        >
          {VoucherStateValue['SHIPPED']}
        </VoucherStateLabel>
        <span>관리자가 사용자에게 포토카드를 발송한 상태입니다.</span>
      </StateDescription>
    </CardBody>
  );
}

export default DescriptionSection;

const StateDescription = styled.section`
  display: flex;
  margin-bottom: 0.5em;

  @media screen and (max-width: 65rem) {
    flex-direction: column;
  }
`