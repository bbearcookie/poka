import React from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { VoucherStateLabel } from '@component/photocard/VoucherCard';
import { VoucherStateType, VoucherStateName } from '@component/list/voucher/voucherListSlice';
import { VoucherType } from '@api/voucherAPI';

interface VoucherInfoProps {
  voucher: VoucherType;
  children?: React.ReactNode;
}
const VoucherInfoDefaultProps = {};

function VoucherInfo({ voucher, children }: VoucherInfoProps & typeof VoucherInfoDefaultProps) {
  return (
    <Card className="VoucherInfo" marginBottom="5em">
      <CardHeader><h1>소유권 정보</h1></CardHeader>

      <CardBody className="info-section" padding="0">
        <ul>
          <li className="info">
            <div className="subtitle">소유권ID</div>
            <div className="body">{voucher.voucher_id}</div>
          </li>
          <li className="info">
            <div className="subtitle">소유자</div>
            <div className="body">
              <section className="user-section">
                <img src="/user.png" alt="사용자" width="75" height="75" />
                <section className="body-section">
                  <p className="nickname-label">{voucher.nickname}</p>
                  <p className="username-label">아이디: <span className="username">{voucher.username}</span></p>
                </section>
              </section>
            </div>
          </li>
          <li className="info">
            <div className="subtitle">상태</div>
            <div className="body">
              <VoucherStateLabel className="state-label" voucherState={voucher.state}>
                {VoucherStateName[voucher.state.toUpperCase() as VoucherStateType]}
              </VoucherStateLabel>
            </div>
          </li>
          <li className="info">
            <div className="subtitle">기록</div>
            <div className="body">
              <Button
                rightIcon={faArrowRight}
                styles={{
                  theme: "primary",
                  padding: "0.7em 1.3em",
                  iconMargin: "1em"
                }}
              >조회</Button>
            </div>
          </li>
        </ul>
      </CardBody>

      <CardBody className="description-section">
        <p className="description">상태는 플랫폼 내에서 발급된 이 소유권의 상태를 나타냅니다.</p>
        <br />
        <section className="state-description">
          <VoucherStateLabel className="state-label" voucherState="available">{VoucherStateName['AVAILABLE']}</VoucherStateLabel>
          <span className="description">사용자끼리 교환이 가능한 상태입니다.</span>
        </section>
        <section className="state-description">
          <VoucherStateLabel className="state-label" voucherState="trading">{VoucherStateName['TRADING']}</VoucherStateLabel>
          <span>소유권으로 교환글을 등록한 상태입니다.</span>
        </section>
        <section className="state-description">
          <VoucherStateLabel className="state-label" voucherState="shipping">{VoucherStateName['SHIPPING']}</VoucherStateLabel>
          <span>사용자가 소유권을 실물로 받기 위해 관리자에게 배송요청한 상태입니다.</span>
        </section>
        <section className="state-description">
          <VoucherStateLabel className="state-label" voucherState="shipped">{VoucherStateName['SHIPPED']}</VoucherStateLabel>
          <span>관리자가 사용자에게 포토카드를 발송한 상태입니다.</span>
        </section>
      </CardBody>

    </Card>
  );
}

VoucherInfo.defaultProps = VoucherInfoDefaultProps;
export default VoucherInfo;