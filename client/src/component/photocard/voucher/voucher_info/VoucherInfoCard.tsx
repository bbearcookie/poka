import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import UserProfile from '@component/profile/UserProfile';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import CardList from '@component/card/basic/CardList';
import CardListItem from '@component/card/basic/CardListItem';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import StateLabel from '@component/label/stateLabel/StateLabel';
import { ResType } from '@api/query/voucher/useVoucherQuery';
import DescriptionSection from './content/DescriptionSection';

interface Props {
  res: ResType;
  showAdminInfo: boolean; // 관리자에게만 보여줄 정보를 출력할지의 여부
}
const DefaultProps = {
  showAdminInfo: false
};

function VoucherInfoCard({ res, showAdminInfo = DefaultProps.showAdminInfo }: Props) {
  return (
    <article>
      <Card styles={{ marginBottom: "5em" }}>
        <CardHeader>
          <TitleLabel title="소유권 정보" />
        </CardHeader>

        <CardBody styles={{ padding: "0" }}>
          <CardList>

            {showAdminInfo && 
            <>
              <VoucherID res={res} />
              <VoucherOwner res={res} />
              <VoucherStateItem res={res} />
              <VoucherLog res={res} />
            </>}

            {!showAdminInfo && 
            <>
              <VoucherOwner res={res} />
              <VoucherStateItem res={res} />
            </>}
          </CardList>

          <DescriptionSection />
        </CardBody>

      </Card>
    </article>
  );
}

export default VoucherInfoCard;

function VoucherID({ res }: { res: ResType }) {
  return (
    <CardListItem title="소유권ID">
      {res.voucherId}
    </CardListItem>
  )
}

function VoucherOwner({ res }: { res: ResType }) {
  return (
    <CardListItem title="소유자">
      <UserProfile {...res.owner} />
    </CardListItem>
  )
}

function VoucherStateItem({ res }: { res: ResType }) {
  return (
    <CardListItem title="상태">
      <StateLabel
        state={{ type: "voucher", key: res.state }}
        styles={{ width: "6em", margin: "0" }}
      />
    </CardListItem>
  )
}

function VoucherLog({ res }: { res: ResType }) {
  return (
    <CardListItem title="기록">
      <Link to={`/admin/voucher/log/${res.voucherId}`}>
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