import React from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import useUserQuery from '@api/query/user/useUserQuery';
import ErrorCard from '@component/card/ErrorCard';
import Success from './Success';
import Loading from './Loading';

interface Props {}
const DefaultProps = {};

function Profile({  }: Props) {
  const { userId } = useAppSelector(state => state.auth);
  const { status, data: user, error } = useUserQuery(userId);

  return (
    <section className="profile-section">
      {status === 'success' && <Success user={user} />}
      {status === 'loading' && <Loading />}
      {status === 'error' && <ErrorCard error={error} styles={{ marginBottom: "5em" }} />}
    </section>
  );
}

export default Profile;