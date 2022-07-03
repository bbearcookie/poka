import React from 'react';
import Button from '@component/form/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './GroupListPage.scss';

type GroupListPageProps = {
  children?: React.ReactNode;
};

function GroupListPage({ children }: GroupListPageProps) {
  return (
    <section className="GroupListPage">
      <div className="label-section">
        <h1 className="page-label">그룹 목록</h1>
        <Button theme="primary" padding="1em 1.5em" iconMargin="1em" leftIcon={faPlus}>추가</Button>
      </div>
    </section>
  );
}

GroupListPage.defaultProps = {

};

export default GroupListPage;