import { Link } from 'react-router-dom';
import { groupImage } from '@api/resource';
import Button from '@component/form/Button';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { StyledGroupProfile } from './_styles';

interface Props {
  groupId: number;
  name: string;
  imageName: string;
}

function GroupProfile({ groupId, name, imageName }: Props) {
  return (
    <StyledGroupProfile>
      <img src={groupImage(imageName)} width="60" height="60" alt={name} />
      <h1 className="name">{name}</h1>
      <Link to={`/admin/group/editor/${groupId}`}>
        <Button
          rightIcon={faPenToSquare}
          iconMargin='1em'
          buttonTheme="primary-outlined"
          css={{
            padding: '0.7em 1.3em',
          }}
        >
          수정
        </Button>
      </Link>
    </StyledGroupProfile>
  );
}

export default GroupProfile;
