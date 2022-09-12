import React, { useCallback } from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { PhotoType } from '@component/photo-list/basic/PhotoCard';
import PhotoListContainer from '@component/photo-list/PhotoListContainer';
import './Index.scss';

interface IndexProps {
  children?: React.ReactNode;
}
const IndexDefaultProps = {};

function Index({ children }: IndexProps & typeof IndexDefaultProps) {
  // 사용자용 상세 페이지로 이동
  const handleClickDetailIcon = useCallback((photo: PhotoType) => {
    console.log('TODO: 사용자용 상세 페이지로 이동');
  }, []);

  return (
    <section className="PhotoSearchPage">
      <h1 className="title-label">포토카드 찾기</h1>
      <PhotoListContainer icon={faArrowRight} handleClickIcon={handleClickDetailIcon} />
    </section>
  );
}

Index.defaultProps = IndexDefaultProps;
export default Index;