import Router from '@route/Router';
import ReactToastify from './element/ReactToastify';
import useAuthCheck from './hook/useAuthCheck';
import useIamport from './hook/useIamport';
import * as types from 'styled-components/cssprop'; // styled-components의 css prop 기능 사용

function App() {
  useAuthCheck();
  useIamport();

  return (
    <>
      <ReactToastify />
      <Router />
    </>
  );
}

export default App;
