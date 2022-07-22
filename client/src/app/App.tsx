import React from 'react';
import Router from '@app/router/Router';
import ReactQuery from '@app/ReactQuery';
import ReactToastify from './ReactToastify';

function App() {
  return (
    <div className="App">
      <ReactQuery>
        <Router />
        <ReactToastify />
      </ReactQuery>
    </div>
  );
}

export default App;
