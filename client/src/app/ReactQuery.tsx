import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

interface ReactQueryProps {
  children?: React.ReactNode;
}

const ReactQueryDefaultProps = {};

function ReactQuery({ children }: ReactQueryProps & typeof ReactQueryDefaultProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

ReactQuery.defaultProps = ReactQueryDefaultProps;

export default ReactQuery;