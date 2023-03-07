import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import UserProfile from '@component/profile/UserProfile';
import { userImage } from '@api/resource';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import StateLabel from '@component/label/stateLabel/StateLabel';
import { ResType as VoucherResType } from '@api/query/voucher/useVoucherQuery';

interface Props {
  voucher: VoucherResType;
}

function VoucherInfo({ voucher }: Props) {
  return (
    <Card className="VoucherInfo" styles={{ marginBottom: "5em" }}>
      <CardHeader><h1>소유권 정보</h1></CardHeader>

      <CardBody className="info-section" styles={{ padding: "0" }}>
        <ul>
          <li className="info">
            <div className="subtitle">소유권ID</div>
            <div className="body">{voucher?.voucherId}</div>
          </li>
          <li className="info">
            <div className="subtitle">소유자</div>
            <div className="body">
              <section className="user-section">
                <UserProfile nickname={voucher?.nickname} username={voucher?.username} imageName={userImage(voucher?.userImageName)} />
              </section>
            </div>
          </li>
          <li className="info">
            <div className="subtitle">상태</div>
            <div className="body">
              <StateLabel className="state-label" state={{ type: "voucher", key: voucher.state || "" }}/>
            </div>
          </li>
          <li className="info">
            <div className="subtitle">기록</div>
            <div className="body">
              <Link to={`/admin/voucher/log/${voucher?.voucherId}`}>
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
          <StateLabel className="state-label" state={{ type: "voucher", key: "available" }} />
          <span className="description">사용자끼리 교환이 가능한 상태입니다.</span>
        </section>
        <section className="state-description">
          <StateLabel className="state-label" state={{ type: "voucher", key: "trading" }} />
          <span>소유권으로 교환글을 등록한 상태입니다.</span>
        </section>
        <section className="state-description">
          <StateLabel className="state-label" state={{ type: "voucher", key: "shipping" }} />
          <span>사용자가 소유권을 실물로 받기 위해 관리자에게 배송요청한 상태입니다.</span>
        </section>
        <section className="state-description">
          <StateLabel className="state-label" state={{ type: "voucher", key: "shipped" }} />
          <span>관리자가 사용자에게 포토카드를 발송한 상태입니다.</span>
        </section>
      </CardBody>

    </Card>
  );
}

export default VoucherInfo;