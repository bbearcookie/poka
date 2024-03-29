import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody } from '@component/card/basic/_styles';
import useSearcher from '@component/search/hook/useSearcher';
import Searcher from '@component/search/Searcher';
import TitleLabel from '@component/label/TitleLabel';
import VoucherList from '@component/list/voucher/VoucherList';
import { StyledIndex } from './_styles';

function Index() {
  const searcher = useSearcher();
  const navigate = useNavigate();

  // 관리자용 상세 페이지로 이동
  const handleSelect = useCallback(
    (voucherId: number) => {
      navigate(`/admin/voucher/detail/${voucherId}`);
    },
    [navigate]
  );

  return (
    <StyledIndex>
      <TitleLabel title="소유권 목록" css={{ marginBottom: '1em' }} />

      <Card>
        <CardBody>
          <Searcher
            hook={searcher}
            category={{
              photoName: '포토카드 이름',
              userName: '사용자 아이디',
            }}
            options={{
              group: true,
              member: true,
              voucherState: true,
            }}
          />

          {searcher.initialized && (
            <VoucherList hook={searcher} icon={{ svg: faArrowRight }} handleSelect={handleSelect} />
          )}
        </CardBody>
      </Card>
    </StyledIndex>
  );
}

export default Index;
