import { useEffect } from 'react';
import Router from '@route/Router';
import ReactToastify from './element/ReactToastify';
import useVerify from '@feature/auth/hook/useVerify';
import * as types from 'styled-components/cssprop'; // styled-components의 css prop 기능 사용

function App() {
  const authCheck = useVerify();

  useEffect(() => {
    authCheck();

    // 아임포트 설정
    const { IMP } = window;
    IMP?.init(process.env.REACT_APP_IAMPORT_IMPCODE);

  }, []);

  return (
    <>
      <ReactToastify />
      <Router />
    </>
  );
}

export default App;
