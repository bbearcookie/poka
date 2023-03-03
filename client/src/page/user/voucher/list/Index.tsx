import React, { useCallback } from 'react';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import { useNavigate } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import VoucherListCard from '@component/list/voucher/VoucherListCard';
import './Index.scss';

interface Props {}

function Index({  }: Props) {
  const navigate = useNavigate();

  // 상세 페이지로 이동
  const handleClickDetailicon = useCallback((voucherId: number) => {
    navigate(`/voucher/detail/${voucherId}`);
  }, [navigate]);

  return (
    <div className="InventoryPage">
    <TitleLabel title="소유권 보관함" styles={{ marginBottom: "1em" }} />
      <VoucherListCard
        icon={{ svg: faArrowRight, tooltip: "상세 보기" }}
        handleSelect={handleClickDetailicon}
        defaultFilter={{
          owner: 'mine',
          state: 'all',
          excludeVoucherId: []
        }}
      />
    </div>
  );
}

export default Index;