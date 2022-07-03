import React from 'react';

type SecondPageProps = {
  children?: React.ReactNode;
};

function SecondPage({ children }: SecondPageProps) {
  return (
    <div>
      두번째 페이지
    </div>
  );
}

SecondPage.defaultProps = {

};

export default SecondPage;