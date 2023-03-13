import React, { useEffect, useCallback } from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import useSearcher from '@component/search/useSearcher';
import Searcher from '@component/search/Searcher';
import VoucherList from '@component/list/VoucherList';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import { useNavigate } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Index.scss';

interface Props {}

function Index({  }: Props) {
  const { filter, keyword, filterDispatch, keywordDispatch } = useSearcher();
  const username = useAppSelector(state => state.auth.username);
  const navigate = useNavigate();

  // 로그인 한 사용자의 소유권만 보이도록 기본 키워드 추가
  useEffect(() => {
    keywordDispatch({
      type: 'ADD_KEYWORD',
      value: { category: 'userName', title: '소유자', value: username, show: false }
    });
  }, [username]);

  // 상세 페이지로 이동
  const showDetailPage = useCallback((voucherId: number) => {
    navigate(`/voucher/detail/${voucherId}`);
  }, [navigate]);

  return (
    <main className="InventoryPage">
      <TitleLabel title="소유권 보관함" styles={{ marginBottom: "1em" }} />
      <Card>
        <CardBody>
          <Searcher
            options={{
              group: true,
              member: true,
              voucherState: true
            }}
            filter={filter}
            keyword={keyword}
            filterDispatch={filterDispatch}
            keywordDispatch={keywordDispatch}
          />

          {username && 
          <VoucherList
            filter={filter}
            keyword={keyword}
            showOwner={false}
            icon={{ svg: faArrowRight }}
            handleSelect={showDetailPage}
          />}
        </CardBody>
      </Card>
    </main>
  );
}

export default Index;