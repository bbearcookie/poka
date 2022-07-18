import React from 'react';
import Form from './Form';
import './Index.scss';

interface GroupWriterPageProps {
  children?: React.ReactNode;
}

const GroupWriterPageDefaultProps = {};

function GroupWriterPage({ children }: GroupWriterPageProps & typeof GroupWriterPageDefaultProps) {
  return (
    <div className="GroupWriterPage">
      <h1 className="title-label">그룹 등록</h1>
      <Form />
    </div>
  );
}

GroupWriterPage.defaultProps = GroupWriterPageDefaultProps;

export default GroupWriterPage;