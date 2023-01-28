import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useVoucherTradeQuery from '@api/query/voucher/useVoucherTradeQuery';
import Button from '@component/form/Button';
import { ResType as VoucherResType } from '@api/query/voucher/useVoucherQuery';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  voucher: VoucherResType;
}
const DefaultProps = {};

function TradeLink({ voucher }: Props) {
  const { data: trade, status } = useVoucherTradeQuery(voucher.voucherId);
  const location = useLocation();

  return (
    <>
      {status === 'success' &&
      <Link to={`/trade/detail/${trade.trade_id}`} state={{ backURL: location.pathname }}>
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