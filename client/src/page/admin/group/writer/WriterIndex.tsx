import React from 'react';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import Form from './Form';
import './Index.scss';

function Index() {
  return (
    <main className="GroupWriterPage">
      <TitleLabel title="그룹 등록" styles={{ marginBottom: "1em" }} />
      <Form />
    </main>
  );
}

export default Index;