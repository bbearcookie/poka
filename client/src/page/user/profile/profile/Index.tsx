import React from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import { useQuery } from 'react-query';
import * as userAPI from '@api/userAPI';
import * as queryKey from '@util/queryKey';
import { ErrorType } from '@util/request';
import { AxiosError, AxiosResponse } from 'axios';
import ErrorCard from '@component/card/ErrorCard';
import Success from './Success';
import Loading from './Loading';

interface ProfileProps {
  children?: React.ReactNode;
}
const ProfileDefaultProps = {};

function Profile({ children }: ProfileProps & typeof ProfileDefaultProps) {
  const userId = useAppSelector(state => state.auth.user_id);

  const { status, data: user, error } =
  useQuery<typeof userAPI.getUserDetail.resType, AxiosError<ErrorType>>
  (queryKey.userKeys.profile(userId), () => userAPI.getUserDetail.axios(userId));

  return (
    <section className="profile-section">
      {status === 'success' && <Success user={user} />}
      {status === 'loading' && <Loading />}
      {status === 'error' && <ErrorCard error={error} styles={{ marginBottom: "5em" }} />}
    </section>
  );
}

Profile.defaultProps = ProfileDefaultProps;
export default Profile;