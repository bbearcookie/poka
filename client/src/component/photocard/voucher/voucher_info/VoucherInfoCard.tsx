import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import UserProfile from '@component/profile/UserProfile';
import CardList from '@component/card/basic/CardList';
import CardListItem from '@component/card/basic/CardListItem';
import { userImage } from '@api/resource';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { VoucherStateLabel } from '@component/photocard/voucher/VoucherCard';
import { VoucherStateKey, VoucherStateValue } from '@/type/voucher';
import { ResType as VoucherResType } from '@api/query/voucher/useVoucherQuery';
import DescriptionSection from './content/DescriptionSection';

interface Props {
  voucher: VoucherResType;
  showAdminInfo: boolean; // 관리자에게만 보여줄 정보를 출력할지의 여부
}
const DefaultProps = {
  showAdminInfo: false
};

function VoucherInfoCard({ voucher, showAdminInfo = DefaultProps.showAdminInfo }: Props) {
  return (
    <Card styles={{ marginBottom: "5em" }}>
      <CardHeader><h1>소유권 정보</h1></CardHeader>

      <CardBody styles={{ padding: "0" }}>
        <CardList>

          {showAdminInfo && 
          <>
            <VoucherID voucher={voucher} />
            <VoucherOwner voucher={voucher} />
            <VoucherState voucher={voucher} />
            <VoucherLog voucher={voucher} />
          </>}

          {!showAdminInfo && 
          <>
            <VoucherOwner voucher={voucher} />
            <VoucherState voucher={voucher} />
          </>}
        </CardList>

        <DescriptionSection />
      </CardBody>

    </Card>
  );
}

export default VoucherInfoCard;

function VoucherID({ voucher }: { voucher: VoucherResType }) {
  return (
    <CardListItem>
      <SubtitleLabel>소유권ID</SubtitleLabel>
      <Body>{voucher.voucher_id}</Body>
    </CardListItem>
  )
}

function VoucherOwner({ voucher }: { voucher: VoucherResType }) {
  return (
    <CardListItem>
      <SubtitleLabel>소유자</SubtitleLabel>
      <Body>
        <UserProfile
          nickname={voucher?.nickname}
          username={voucher?.username}
          imageName={userImage(voucher?.user_image_name)}
        />
      </Body>
    </CardListItem>
  )
}

function VoucherState({ voucher }: { voucher: VoucherResType }) {
  return (
    <CardListItem>
      <SubtitleLabel>상태</SubtitleLabel>
      <Body>
        <VoucherStateLabel voucherState={voucher?.state || ''} width="6em" textAlign="center">
          {VoucherStateValue[voucher?.state.toUpperCase() as VoucherStateKey]}
        </VoucherStateLabel>
      </Body>
    </CardListItem>
  )
}

function VoucherLog({ voucher }: { voucher: VoucherResType }) {
  return (
    <CardListItem>
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
    </CardListItem>
  )
}


const SubtitleLabel = styled.div`
  flex-basis: 30%;
`

const Body = styled.div`
  flex-basis: 70%; color: #65748b;
`