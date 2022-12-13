import React, { useCallback } from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import PhotoListCard from '@component/list/photo/PhotoListCard';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function Index({  }: Props) {
  // 사용자용 상세 페이지로 이동
  const handleClickDetailIcon = useCallback((photocardId: number) => {
    console.log('TODO: 사용자용 상세 페이지로 이동');
  }, []);

  return (
    <section className="PhotoSearchPage">
      <h1 className="title-label">포토카드 찾기</h1>
      <PhotoListCard icon={faArrowRight} handleClickIcon={handleClickDetailIcon} />
    </section>
  );
}

export default Index;