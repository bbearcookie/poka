import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@component/form/Button';
import { ResType as VoucherResType } from '@api/query/voucher/useVoucherQuery';
import { faShareNodes, faTruckFast } from '@fortawesome/free-solid-svg-icons';

interface Props {
  voucher: VoucherResType;
}
const DefaultProps = {};

function ButtonSection({ voucher }: Props) {
  return (
    <section className="button-section">
      <Link to={`/trade/writer?voucherId=${voucher.voucher_id}`}>
        <Button
          leftIcon={faShareNodes}
          styles={{
            theme: "primary",
            iconMargin: "3em"
          }}
        >교환글 작성하기</Button>
      </Link>
      <Button
        leftIcon={faTruckFast}
        styles={{
          theme: "pink",
          iconMargin: "3.6em"
        }}
      >배송 요청하기</Button>
    </section>
  );
}

export default ButtonSection;