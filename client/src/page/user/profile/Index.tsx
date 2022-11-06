import React from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import { useQuery } from 'react-query';
import * as userAPI from '@api/userAPI';
import * as queryKey from '@util/queryKey';
import { ErrorType } from '@util/commonAPI';
import { AxiosError, AxiosResponse } from 'axios';
import Success from './Success';
import './Index.scss';

interface IndexProps {
  children?: React.ReactNode;
}
const IndexDefaultProps = {};

function Index({ children }: IndexProps & typeof IndexDefaultProps) {
  const userId = useAppSelector(state => state.auth.user_id);

  const { status, data: user, error } =
  useQuery<typeof userAPI.getUserDetail.resType, AxiosError<ErrorType>>
  (queryKey.userKeys.detail(userId), () => userAPI.getUserDetail.axios(userId));
  
  return (
    <div className="ProfilePage">
      <h1 className="title-label">마이페이지</h1>
      {status === 'success' && <Success user={user} />}
    </div>
  );
}

Index.defaultProps = IndexDefaultProps;
export default Index;