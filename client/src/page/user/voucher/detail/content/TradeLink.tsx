import React from 'react';
import { Link } from 'react-router-dom';
import useVoucherTradeQuery from '@api/query/voucher/useVoucherTradeQuery';
import Button from '@component/form/Button';
import { ResType as VoucherResType } from '@api/query/voucher/useVoucherQuery';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  voucher: VoucherResType;
}
const DefaultProps = {};

function TradeLink({ voucher }: Props) {
  const { data: trade, status } = useVoucherTradeQuery(voucher.voucher_id);

  return (
    <>
      {status === 'success' &&
      <Link to={`/trade/detail/${trade.trade_id}`}>
        <Button
          leftIcon={faShareNodes}
          styles={{
            theme: "mint",
            iconMargin: "3em"
          }}
        >교환글 보기</Button>
      </Link>}
    </>
  );
}

export default TradeLink;