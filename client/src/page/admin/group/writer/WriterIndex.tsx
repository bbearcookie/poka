import React from 'react';
import Form from './Form';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function GroupWriterPage({  }: Props) {
  return (
    <div className="GroupWriterPage">
      <h1 className="title-label">그룹 등록</h1>
      <Form />
    </div>
  );
}

export default GroupWriterPage;