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

  // 관리자용 상세 페이지로 이동
  const handleClickDetailicon = useCallback((voucherId: number) => {
    navigate(`/admin/voucher/detail/${voucherId}`);
  }, [navigate]);

  return (
    <div className="VoucherListPage">
      <h1 className="title-label">소유권 목록</h1>
      <VoucherListCard
        icon={faArrowRight}
        handleClickIcon={handleClickDetailicon}
        defaultFilter={{
          owner: 'ALL',
          state: 'ALL'
        }}
      />
    </div>
  );
}

Index.defaultProps = IndexDefaultProps;
export default Index;