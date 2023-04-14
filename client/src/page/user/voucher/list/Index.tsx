import { useCallback } from 'react';
import { useAppSelector } from '@app/redux/store';
import { Card, CardBody } from '@component/card/basic/_styles';
import useSearcher from '@component/search/hook/useSearcher';
import Searcher from '@component/search/Searcher';
import VoucherList from '@component/list/voucher/VoucherList';
import TitleLabel from '@component/label/TitleLabel';
import { useNavigate } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { StyledIndex } from './_styles';

function Index() {
  const username = useAppSelector(state => state.auth.username);
  const searcher = useSearcher({
    defaultKeyword: [{ category: 'userName', title: '소유자', value: username, show: false }],
  });
  const navigate = useNavigate();

  // 상세 페이지로 이동
  const showDetailPage = useCallback(
    (voucherId: number) => {
      navigate(`/voucher/detail/${voucherId}`);
    },
    [navigate]
  );

  return (
    <StyledIndex>
      <TitleLabel title="소유권 보관함" css={{ marginBottom: '1em' }} />
      <Card>
        <CardBody>
          <Searcher
            hook={searcher}
            options={{
              group: true,
              member: true,
              voucherState: true,
            }}
          />

          {searcher.initialized && (
            <VoucherList hook={searcher} showOwner={false} icon={{ svg: faArrowRight }} handleSelect={showDetailPage} />
          )}
        </CardBody>
      </Card>
    </StyledIndex>
  );
}

export default Index;
