import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import VoucherListCard from '@component/list/voucher/VoucherListCard';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function Index({  }: Props) {
  const navigate = useNavigate();

  // 관리자용 상세 페이지로 이동
  const handleSelect = useCallback((voucherId: number) => {
    navigate(`/admin/voucher/detail/${voucherId}`);
  }, [navigate]);

  return (
    <div className="VoucherListPage">
      <h1 className="title-label">소유권 목록</h1>
      <VoucherListCard
        icon={{ svg: faArrowRight }}
        handleSelect={handleSelect}
        defaultFilter={{
          owner: 'all',
          state: 'all',
          excludeVoucherId: []
        }}
      />
    </div>
  );
}

export default Index;