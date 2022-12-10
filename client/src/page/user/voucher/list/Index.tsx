import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import VoucherListCard from '@component/list/voucher/VoucherListCard';
import './Index.scss';

interface IndexProps {
  children?: React.ReactNode;
}
const IndexDefaultProps = {};

function Index({ children }: IndexProps & typeof IndexDefaultProps) {
  const navigate = useNavigate();

  // 상세 페이지로 이동
  const handleClickDetailicon = useCallback((voucherId: number) => {
    navigate(`/voucher/detail/${voucherId}`);
  }, [navigate]);

  return (
    <div className="InventoryPage">
    <h1 className="title-label">소유권 보관함</h1>
      <VoucherListCard owner='mine' icon={faArrowRight} handleClickIcon={handleClickDetailicon} />
    </div>
  );
}

Index.defaultProps = IndexDefaultProps;
export default Index;