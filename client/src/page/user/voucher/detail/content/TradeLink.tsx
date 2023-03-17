import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useVoucherTradeQuery from '@api/query/voucher/useVoucherTradeQuery';
import Button from '@component/form/Button';
import { ResType } from '@api/query/voucher/useVoucherQuery';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  res: ResType;
}

function TradeLink({ res }: Props) {
  const { data: trade, status } = useVoucherTradeQuery(res.voucher.voucherId);
  const location = useLocation();

  return (
    <>
      {status === 'success' &&
      <Link to={`/trade/detail/${trade.tradeId}`} state={{ backURL: location.pathname }}>
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