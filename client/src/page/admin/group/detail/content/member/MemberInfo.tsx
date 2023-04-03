import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@component/form/IconButton';
import { faPenToSquare, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
  memberId: number;
  name: string;
  photoCount: number;
  startEditor: (target: number | true) => void;
}

function MemberInfo({ memberId, name, photoCount, startEditor }: Props) {
  const openEditor = useCallback(() => {
    startEditor(memberId);
  }, [memberId, startEditor]);

  return (
    <tr>
      <td><Link to={`/admin/member/detail/${memberId}`}>{name}</Link></td>
      <td>{photoCount} 종류</td>
      <td>
        <section className="action-section">
          <IconButton icon={faPenToSquare} onClick={openEditor} />
          <Link to={`/admin/member/detail/${memberId}`}>
            <IconButton icon={faArrowRight} />
          </Link>
        </section>
      </td>
    </tr>
  );
}

export default MemberInfo;