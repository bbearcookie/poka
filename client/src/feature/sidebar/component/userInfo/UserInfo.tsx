import useUserQuery from '@api/query/user/useUserQuery';
import Profile from './content/Profile';
import useIsOpened from '../../hook/useIsOpened';
import { StyledProfile } from './content/Profile.style';
import LinkItems from './content/ItemList';

interface Props {
  userId: number;
}

function UserInfo({ userId }: Props) {
  const { isOpened, toggleOpen } = useIsOpened();
  const { data: user, status } = useUserQuery(userId);

  switch (status) {
    case 'loading':
      return <StyledProfile isOpened={false} />;
    case 'success':
      return (
        <>
          <Profile user={user} isOpened={isOpened} toggleOpen={toggleOpen} />
          <LinkItems isOpened={isOpened} role={user.role} />
        </>
      );
    case 'error':
      return <></>;
    default:
      return <></>;
  }
}

export default UserInfo;
