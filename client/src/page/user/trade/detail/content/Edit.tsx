import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TradeItem } from '@type/trade';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';

interface Props {
  trade: TradeItem;
}

function Edit({ trade }: Props) {
  const navigate = useNavigate();

  const onClickEdit = useCallback(() => {
    navigate(`/trade/editor/${trade.tradeId}`);
  }, [navigate, trade]);

  return (
    <Button
      leftIcon={faEdit}
      onClick={onClickEdit}
      styles={{
        theme: 'primary',
        width: '7em',
        iconMargin: '1em',
      }}
    >
      수정
    </Button>
  );
}

export default Edit;
