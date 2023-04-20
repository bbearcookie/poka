import { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import QueryString from 'qs';
import TitleLabel from '@component/label/TitleLabel';
import { faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody } from '@component/card/basic/_styles';
import Button from '@component/form/button/Button';
import PhotoListWithFilter from '@component/list/photo/PhotoListWithFilter';
import { StyledIndex } from './_styles';

function PhotoListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = QueryString.parse(location.search, { ignoreQueryPrefix: true });
  const groupId = Number(query.groupId) || 0;
  const memberId = Number(query.memberId) || 0;

  // 관리자용 상세 페이지로 이동
  const handleSelect = useCallback(
    (photocardId: number) => {
      navigate(`/admin/photo/detail/${photocardId}`);
    },
    [navigate]
  );

  return (
    <StyledIndex>
      <TitleLabel title="포토카드 목록" css={{ marginBottom: '1em' }}>
        <Link to="/admin/photo/writer">
          <Button
            buttonTheme="primary"
            leftIcon={faPlus}
            iconMargin="1em"
            css={{
              padding: '0.7em 1.3em',
              iconMargin: '1em',
            }}
          >
            추가
          </Button>
        </Link>
      </TitleLabel>

      <Card>
        <CardBody>
          <PhotoListWithFilter
            icon={{ svg: faArrowRight }}
            handleSelect={handleSelect}
            defaultGroupIds={[groupId]}
            defaultMemberIds={[memberId]}
          />
        </CardBody>
      </Card>
    </StyledIndex>
  );
}

export default PhotoListPage;
