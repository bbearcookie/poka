import React from 'react';
import PhotoListContainer from '@component/photo-list/PhotoListContainer';
import './Index.scss';

interface IndexProps {
  children?: React.ReactNode;
}
const IndexDefaultProps = {};

function Index({ children }: IndexProps & typeof IndexDefaultProps) {
  return (
    <section className="PhotoSearchPage">
      <h1 className="title-label">포토카드 찾기</h1>
      <PhotoListContainer />
    </section>
  );
}

Index.defaultProps = IndexDefaultProps;
export default Index;