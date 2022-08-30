import React from 'react';
import Router from '@app/router/Router';
import ReactQuery from '@app/ReactQuery';
import ReactToastify from './ReactToastify';
import AuthCheck from './AuthCheck';

function App() {
  return (
    <div className="App">
      <ReactQuery>
        <AuthCheck />
        <Router />
        <ReactToastify />
      </ReactQuery>
    </div>
  );
}

export default App;
