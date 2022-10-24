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
              <VoucherStateLabel voucherState={voucher.state}>
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
              >
                확인
              </Button>
            </div>
          </li>
        </ul>
      </CardBody>
      <CardBody>
        <div className="description">
          <div>상태는 플랫폼 내에서 발급된 이 소유권의 상태를 나타냅니다.</div>
          <br />
          <div>[교환가능(available)] &gt; 사용자끼리 교환이 가능한 상태입니다.</div>
          <div>[교환중(trading)] &gt; 소유권으로 교환글을 등록한 상태입니다.</div>
          <div>[배송대기중(shipping)] &gt; 사용자가 소유권을 실물로 받기 위해 관리자에게 배송요청한 상태입니다.</div>
          <div>[배송완료(shipped)] &gt; 관리자가 사용자에게 포토카드를 발송한 상태입니다.</div>
        </div>
      </CardBody>
    </Card>
  );
}

VoucherInfo.defaultProps = VoucherInfoDefaultProps;
export default VoucherInfo;