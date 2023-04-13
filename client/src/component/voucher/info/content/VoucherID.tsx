import React from 'react';
import CardListItem from '@component/card/basic/CardListItem';

interface Props {
  voucherId: number;
}

function VoucherID({ voucherId }: Props) {
  return <CardListItem title="소유권ID">{voucherId}</CardListItem>;
}

export default VoucherID;
