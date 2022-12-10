import React from 'react';
import styled from 'styled-components';
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
import { VoucherStateType, VoucherStateName } from '@component/list/voucher/voucherListSlice';

interface VoucherInfoCardProps {
  voucher: typeof voucherAPI.getVoucherDetail.resType;
  showAdminInfo: boolean; // 관리자에게만 보여줄 정보를 출력할지의 여부
  children?: React.ReactNode;
}
const VoucherInfoCardDefaultProps = {
  showAdminInfo: false
};

function VoucherInfoCard({ voucher, showAdminInfo, children }: VoucherInfoCardProps & typeof VoucherInfoCardDefaultProps) {
  return (
    <Card styles={{ marginBottom: "5em" }}>
      <CardHeader><h1>소유권 정보</h1></CardHeader>

      <CardBody styles={{ padding: "0" }}>
        <Ul>
          {showAdminInfo && 
          <Info>
            <SubtitleLabel>소유권ID</SubtitleLabel>
            <Body>{voucher?.voucher_id}</Body>
          </Info>}
          <Info>
            <SubtitleLabel>소유자</SubtitleLabel>
            <Body>
              <UserProfile
                nickname={voucher?.nickname}
                username={voucher?.username}
                imageName={userImage(voucher?.user_image_name)}
              />
            </Body>
          </Info>
          <Info>
            <SubtitleLabel>상태</SubtitleLabel>
            <Body>
              <VoucherStateLabel voucherState={voucher?.state || ''} width="6em" textAlign="center">
                {VoucherStateName[voucher?.state.toUpperCase() as VoucherStateType]}
              </VoucherStateLabel>
            </Body>
          </Info>
          {showAdminInfo && 
          <Info>
            <SubtitleLabel>기록</SubtitleLabel>
            <Body>
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
            </Body>
          </Info>}
        </Ul>
      </CardBody>

      <CardBody>
        <DescriptionSection>
          <p className="description">상태는 플랫폼 내에서 발급된 이 소유권의 상태를 나타냅니다.</p>
          <br />
          <StateDescription>
            <VoucherStateLabel
              voucherState="available"
              width="6em"
              textAlign="center"
              margin="0 0.5em 0.2em 0"
            >
              {VoucherStateName['AVAILABLE']}
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
              {VoucherStateName['TRADING']}
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
              {VoucherStateName['SHIPPING']}
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
              {VoucherStateName['SHIPPED']}
            </VoucherStateLabel>
            <span>관리자가 사용자에게 포토카드를 발송한 상태입니다.</span>
          </StateDescription>
        </DescriptionSection>
      </CardBody>

    </Card>
  );
}

VoucherInfoCard.defaultProps = VoucherInfoCardDefaultProps;
export default VoucherInfoCard;

const Ul = styled.ul`
  margin: 0; padding: 0
`

const Info = styled.li`
  display: flex;
  border-bottom: 1px solid #E5E7EB;
  padding: 1.5em;

  @media screen and (max-width: 65rem) {
    flex-direction: column;
    gap: 0.5em;
  }
`

const SubtitleLabel = styled.div`
  flex-basis: 30%;
`

const Body = styled.div`
  flex-basis: 70%; color: #65748b;
`

const DescriptionSection = styled.section`
  color: #65748b;
`

const StateDescription = styled.section`
  display: flex;
  margin-bottom: 0.5em;

  @media screen and (max-width: 65rem) {
    flex-direction: column;
  }
`