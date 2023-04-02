import { useAppSelector } from '@app/redux/reduxHooks';
import useUserQuery from '@api/query/user/useUserQuery';
import ErrorCard from '@component/card/ErrorCard';
import SkeletonUserProfileInfo from '@component/profile/info/SkeletonUserProfileInfo';
import Success from './Success';

interface Props {
  userId: number;
}

function Index({ userId }: Props) {
  const { status, data: user, error } = useUserQuery(userId);

  return (
    <div className="profile-section">
      {status === 'success' && <Success res={user} />}
      {status === 'loading' && <SkeletonUserProfileInfo />}
      {status === 'error' && <ErrorCard error={error} styles={{ marginBottom: "5em" }} />}
    </div>
  );
}

export default Index;