import React from 'react';
import Router from '@app/router/Router';
import ReactQuery from '@app/ReactQuery';
import ReactToastify from './ReactToastify';
import AuthCheck from './AuthCheck';
import Iamport from './Iamport';

function App() {
  return (
    <div className="App">
      <ReactQuery>
        <AuthCheck />
        <ReactToastify />
        <Iamport />
        <Router />
      </ReactQuery>
    </div>
  );
}

export default App;
