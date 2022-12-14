import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';
import PhotoListCard from '@component/list/photo/PhotoListCard';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function PhotoListPage({  }: Props) {
  const navigate = useNavigate();

  // 관리자용 상세 페이지로 이동
  const handleClickDetailIcon = useCallback((photocardId: number) => {
    navigate(`/admin/photo/detail/${photocardId}`);
  }, [navigate]);

  return (
    <section className="PhotoListPage">
      <section className="title-label-section">
        <h1 className="title-label">포토카드 목록</h1>
        <Link to="/admin/photo/writer">
          <Button
            leftIcon={faPlus} 
            styles={{
              theme: "primary",
              padding: "0.7em 1.3em",
              iconMargin:"1em"
            }}
          >추가</Button>
        </Link>
      </section>
      <PhotoListCard
        resetOnMount={false}
        icon={faArrowRight}
        handleClickIcon={handleClickDetailIcon}
      />
    </section>
  );
}

export default PhotoListPage;