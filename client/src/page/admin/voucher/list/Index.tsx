import React from 'react';
import VoucherListCard from '@component/list/voucher/VoucherListCard';
import './Index.scss';

interface IndexProps {
  children?: React.ReactNode;
}
const IndexDefaultProps = {};

function Index({ children }: IndexProps & typeof IndexDefaultProps) {
  return (
    <div className="VoucherListPage">
      <h1 className="title-label">소유권 목록</h1>
      <VoucherListCard />
    </div>
  );
}

Index.defaultProps = IndexDefaultProps;
export default Index;