import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@component/form/Button';
import { ResType as VoucherResType } from '@api/query/voucher/useVoucherQuery';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  voucher: VoucherResType;
}
const DefaultProps = {};

function WriteLink({ voucher }: Props) {
  return (
    <Link to={`/trade/writer?voucherId=${voucher.voucherId}`}>
      <Button
        leftIcon={faShareNodes}
        styles={{
          theme: "primary",
          iconMargin: "3em"
        }}
      >교환글 작성하기</Button>
    </Link>
  );
}

export default WriteLink;