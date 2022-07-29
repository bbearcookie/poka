import React from 'react';
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Search from './Search';
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
          <Button theme="primary" padding="0.7em 1.3em" iconMargin="1em" leftIcon={faPlus}>추가</Button>
        </Link>
      </section>
      <Card>
        <CardHeader padding="0" borderBottom="0">
          <Search />
        </CardHeader>
        <CardBody>
          포토카드 목록 보여주기
        </CardBody>
      </Card>
    </section>
  );
}

PhotoListPage.defaultProps = PhotoListPageDefaultProps;
export default PhotoListPage;