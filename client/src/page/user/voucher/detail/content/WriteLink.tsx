import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@component/form/Button';
import { ResType } from '@api/query/voucher/useVoucherQuery';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  res: ResType;
}

function WriteLink({ res }: Props) {
  return (
    <Link to={`/trade/writer?voucherId=${res.voucherId}`}>
      <Button
        buttonTheme='primary'
        leftIcon={faShareNodes}
        iconMargin='3em'
      >
        교환글 작성하기
      </Button>
    </Link>
  );
}

export default WriteLink;
