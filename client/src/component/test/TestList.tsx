import React from 'react';
import { useQuery } from 'react-query';
import * as testApi from '@api/testApi';
import * as queryKey from '@util/queryKey';
import { AxiosError, AxiosResponse } from 'axios';

interface TestListProps {
  children?: React.ReactNode;
}

const TestListDefaultProps = {};

interface TestDataType {
  author: string;
  content: string;
}

function TestList({ children }: TestListProps & typeof TestListDefaultProps) {
  const { status, data: list, error } = useQuery<AxiosResponse<TestDataType[]>>
  (queryKey.testListKeys.all, testApi.getAllList);

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    console.log(error);
    return <span>Error: {((error as AxiosError).response?.data as any)?.message}</span>
  }

  return (
    <div>
      {list?.data.map((d, idx) => <div key={idx}>{d.author}: {d.content}</div>)}
    </div>
  );
}

TestList.defaultProps = TestListDefaultProps;

export default TestList;