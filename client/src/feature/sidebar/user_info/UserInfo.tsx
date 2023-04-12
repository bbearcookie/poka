import useUserQuery from '@api/query/user/useUserQuery';
import Profile from './profile/Profile';
import useIsOpened from '../opened/hook/useIsOpened';
import { StyledProfile } from './profile/Profile.style';
import LinkItems from './link_items/LinkItems';

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
