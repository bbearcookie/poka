import React from 'react';
import TestList from '@component/test/TestList';
import TestForm from '@component/test/TestForm';

interface FirstPageProps {
  children?: React.ReactNode;
}
const FirstPageDefaultProps = {};

function FirstPage({ children }: FirstPageProps & typeof FirstPageDefaultProps) {
  return (
    <div>
      <div>첫 번째 페이지</div>
      <hr/>
      <TestForm />
      <hr/>
      <h1>DB에 저장된 목록</h1>
      <TestList />
    </div>
  );
}

FirstPage.defaultProps = FirstPageDefaultProps;

export default FirstPage;