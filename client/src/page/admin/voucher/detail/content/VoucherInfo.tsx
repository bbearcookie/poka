import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import UserProfile from '@component/profile/UserProfile';
import * as voucherAPI from '@api/voucherAPI';
import { userImage } from '@api/resource';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { VoucherStateLabel } from '@component/photocard/VoucherCard';
import { VoucherStateType, VoucherStateName } from '@component/list/common/filter/DataType';

interface Props {
  voucher: typeof voucherAPI.getVoucherDetail.resType;
}
const DefaultProps = {};

function VoucherInfo({ voucher }: Props) {
  return (
    <Card className="VoucherInfo" styles={{ marginBottom: "5em" }}>
      <CardHeader><h1>소유권 정보</h1></CardHeader>

      <CardBody className="info-section" styles={{ padding: "0" }}>
        <ul>
          <li className="info">
            <div className="subtitle">소유권ID</div>
            <div className="body">{voucher?.voucher_id}</div>
          </li>
          <li className="info">
            <div className="subtitle">소유자</div>
            <div className="body">
              <section className="user-section">
                <UserProfile nickname={voucher?.nickname} username={voucher?.username} imageName={userImage(voucher?.user_image_name)} />
              </section>
            </div>
          </li>
          <li className="info">
            <div className="subtitle">상태</div>
            <div className="body">
              <VoucherStateLabel className="state-label" voucherState={voucher?.state || ''}>
                {VoucherStateName[voucher?.state.toUpperCase() as VoucherStateType]}
              </VoucherStateLabel>
            </div>
          </li>
          <li className="info">
            <div className="subtitle">기록</div>
            <div className="body">
              <Link to={`/admin/voucher/log/${voucher?.voucher_id}`}>
                <Button
                  rightIcon={faArrowRight}
                  styles={{
                    theme: "primary",
                    padding: "0.7em 1.3em",
                    iconMargin: "1em"
                  }}
                >조회</Button>
              </Link>
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

export default VoucherInfo;