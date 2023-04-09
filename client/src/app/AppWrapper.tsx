import ReduxProvider from './provider/ReduxProvider';
import ReactQueryProvider from '@app/provider/ReactQueryProvider';
import App from './App';

function AppWrapper() {
  return (
    <ReduxProvider>
      <ReactQueryProvider>
        <App />
      </ReactQueryProvider>
    </ReduxProvider>
  );
}

export default AppWrapper;