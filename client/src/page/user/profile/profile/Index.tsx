import React from 'react';
import { useQuery } from 'react-query';
import * as userAPI from '@api/userAPI';
import * as queryKey from '@util/queryKey';
import { ErrorType } from '@util/commonAPI';
import { AxiosError, AxiosResponse } from 'axios';
import ErrorCard from '@component/card/ErrorCard';
import Success from './Success';
import Loading from './Loading';

interface ProfileProps {
  userId: number
  children?: React.ReactNode;
}
const ProfileDefaultProps = {};

function Profile({ userId, children }: ProfileProps & typeof ProfileDefaultProps) {
  const { status, data: user, error } =
  useQuery<typeof userAPI.getUserDetail.resType, AxiosError<ErrorType>>
  (queryKey.userKeys.detail(userId), () => userAPI.getUserDetail.axios(userId));

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