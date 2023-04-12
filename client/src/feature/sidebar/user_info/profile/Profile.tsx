import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { RoleText, User } from '@/type/user';
import { userImage } from '@api/resource';
import { StyledProfile } from './Profile.style';

interface Props {
  user: User;
  isOpened: boolean;
  toggleOpen: () => void;
}

function Profile({ user, isOpened, toggleOpen }: Props) {
  return (
    <StyledProfile isOpened={isOpened} onClick={toggleOpen}>
      <img className="img" src={userImage(user.imageName)} alt="프로필" width="48" height="48" />
      <div className="info-section">
        <span className="nickname">
          <b>{user.nickname}</b>
        </span>
        <span className="role">{RoleText[user.role]}</span>
      </div>
      <FontAwesomeIcon icon={isOpened ? faAngleDown : faAngleRight} />
    </StyledProfile>
  );
}

export default Profile;
