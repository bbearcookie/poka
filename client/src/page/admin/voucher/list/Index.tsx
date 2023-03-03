import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import VoucherListCard from '@component/list/voucher/VoucherListCard';
import './Index.scss';

interface Props {}

function Index({  }: Props) {
  const navigate = useNavigate();

  // 관리자용 상세 페이지로 이동
  const handleSelect = useCallback((voucherId: number) => {
    navigate(`/admin/voucher/detail/${voucherId}`);
  }, [navigate]);

  return (
    <div className="VoucherListPage">
      <TitleLabel title="소유권 목록" styles={{ marginBottom: "1em" }} />
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