import React from 'react';

type FirstPageProps = {
  children?: React.ReactNode;
};

function FirstPage({ children }: FirstPageProps) {
  return (
    <div>
      첫번째 페이지
    </div>
  );
}

FirstPage.defaultProps = {

};

export default FirstPage;