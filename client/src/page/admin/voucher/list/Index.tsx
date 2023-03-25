import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import useSearcher from '@component/search/useSearcher';
import Searcher from '@component/search/Searcher';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import VoucherList from '@component/list/VoucherList';
import './Index.scss';

function Index() {
  const { filter, keyword, filterDispatch, keywordDispatch } = useSearcher();
  const navigate = useNavigate();

  // 관리자용 상세 페이지로 이동
  const handleSelect = useCallback(
    (voucherId: number) => {
      navigate(`/admin/voucher/detail/${voucherId}`);
    },
    [navigate]
  );

  return (
    <main className="VoucherListPage">
      <TitleLabel title="소유권 목록" styles={{ marginBottom: '1em' }} />

      <Card>
        <CardBody>
          <Searcher
            category={{
              photoName: '포토카드 이름',
              userName: '사용자 아이디',
            }}
            options={{
              group: true,
              member: true,
              voucherState: true,
            }}
            filter={filter}
            keyword={keyword}
            filterDispatch={filterDispatch}
            keywordDispatch={keywordDispatch}
          />

          <VoucherList
            filter={filter}
            keyword={keyword}
            icon={{ svg: faArrowRight }}
            handleSelect={handleSelect}
          />
        </CardBody>
      </Card>
    </main>
  );
}

export default Index;
