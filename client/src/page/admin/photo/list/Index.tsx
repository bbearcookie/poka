import React from 'react';
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';
import PhotoListContainer from '@component/photo-list/PhotoListContainer';
import './Index.scss';

interface PhotoListPageProps {
  children?: React.ReactNode;
}
const PhotoListPageDefaultProps = {};

function PhotoListPage({ children }: PhotoListPageProps & typeof PhotoListPageDefaultProps) {
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
      <PhotoListContainer />
    </section>
  );
}

PhotoListPage.defaultProps = PhotoListPageDefaultProps;
export default PhotoListPage;