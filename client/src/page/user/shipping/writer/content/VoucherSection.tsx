import React from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';

interface Props {

}
const DefaultProps = {};

function VoucherSection({  }: Props) {
  return (
    <section className="voucher-section">
      <Card styles={{ marginBottom: "5em" }}>
        <CardHeader>
          <h1 className="title">소유권 선택</h1>
        </CardHeader>
        <CardBody>
          <p className="description">자신이 가지고 있는 소유권 중에서 실물로 배송받으려는 소유권을 지정합니다.</p>
        </CardBody>
      </Card>
    </section>
  );
}

export default VoucherSection;