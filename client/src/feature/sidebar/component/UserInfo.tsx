import useUserQuery from '@api/query/user/useUserQuery';
import { RoleText } from '@/type/user';
import { userImage } from '@api/resource';
import { StyledUserInfo } from './UserInfo.style';

interface Props {
  userId: number;
}

function UserInfo({ userId }: Props) {
  const { data: user, status } = useUserQuery(userId);

  return (
    <>
      {status === 'loading' && <Loading />}
      {status === 'success' && (
        <StyledUserInfo>
          <img
            className="img"
            src={userImage(user.imageName)}
            alt="프로필"
            width="48"
            height="48"
          />
          <div className="info-section">
            <span className="nickname">
              <b>{user.nickname}</b>
            </span>
            <span className="role">{RoleText[user.role]}</span>
          </div>
        </StyledUserInfo>
      )}
    </>
  );
}

export default UserInfo;

function Loading() {
  return <StyledUserInfo />;
}
