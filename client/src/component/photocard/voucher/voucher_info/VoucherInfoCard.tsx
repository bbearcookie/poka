import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import UserProfile from '@component/profile/UserProfile';
import CardList from '@component/card/basic/CardList';
import CardListItem from '@component/card/basic/CardListItem';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import StateLabel, { VoucherStateValue } from '@component/label/StateLabel';
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
            <VoucherStateItem voucher={voucher} />
            <VoucherLog voucher={voucher} />
          </>}

          {!showAdminInfo && 
          <>
            <VoucherOwner voucher={voucher} />
            <VoucherStateItem voucher={voucher} />
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
    <CardListItem title="소유권ID">
      {voucher.voucherId}
    </CardListItem>
  )
}

function VoucherOwner({ voucher }: { voucher: VoucherResType }) {
  return (
    <CardListItem title="소유자">
      <UserProfile
        nickname={voucher?.nickname}
        username={voucher?.username}
        imageName={voucher?.userImageName}
      />
    </CardListItem>
  )
}

function VoucherStateItem({ voucher }: { voucher: VoucherResType }) {
  return (
    <CardListItem title="상태">
      <StateLabel state={{ type: "voucher", key: voucher.state}} width="6em">
        {VoucherStateValue[voucher.state]}
      </StateLabel>
    </CardListItem>
  )
}

function VoucherLog({ voucher }: { voucher: VoucherResType }) {
  return (
    <CardListItem title="기록">
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
    </CardListItem>
  )
}