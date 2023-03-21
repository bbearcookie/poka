import React from 'react';
import styled from 'styled-components';
import CardBody from '@component/card/basic/CardBody';
import StateLabel from '@component/label/stateLabel/StateLabel';

function DescriptionSection() {
  return (
    <CardBody styles={{ color: "#65748b" }}>
      <p className="description">상태는 플랫폼 내에서 발급된 이 소유권의 상태를 나타냅니다.</p>
      <br />
      
      <StateDescription>
        <StateLabel state={{ type: "voucher", key: "available" }} styles={{ width: "6em", margin: "0 0.5em 0.2em 0" }} />
        <Span>사용자끼리 교환이 가능한 상태입니다.</Span>
      </StateDescription>

      <StateDescription>
        <StateLabel state={{ type: "voucher", key: "trading" }} styles={{ width: "6em", margin: "0 0.5em 0.2em 0" }} />
        <Span>소유권으로 교환글을 등록한 상태입니다.</Span>
      </StateDescription>

      <StateDescription>
        <StateLabel state={{ type: "voucher", key: "shipping" }} styles={{ width: "6em", margin: "0 0.5em 0.2em 0" }} />
        <Span>사용자가 소유권을 실물로 받기 위해 관리자에게 배송요청한 상태입니다.</Span>
      </StateDescription>

      <StateDescription>
        <StateLabel state={{ type: "voucher", key: "shipped" }} styles={{ width: "6em", margin: "0 0.5em 0.2em 0" }} />
        <Span>관리자가 사용자에게 포토카드를 발송한 상태입니다.</Span>
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

const Span = styled.span`
  display: inline-block;
  line-height: 1.75em;
`