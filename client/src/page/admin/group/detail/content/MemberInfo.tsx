import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@component/form/IconButton';
import { faPenToSquare, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import TableBodyItem from '@component/table/TableBodyItem';

interface Props {
  memberId: number;
  name: string;
  photoCnt: number;
  startEditor: () => void;
  children?: React.ReactNode;
}
const DefaultProps = {};

function MemberInfo({ memberId, name, photoCnt, startEditor, children }: Props) {
  return (
    <tr>
      <TableBodyItem styles={{ paddingLeft: "1.5em" }}>
        <Link to={`/admin/member/detail/${memberId}`}>
          {name}
        </Link>
      </TableBodyItem>
      <TableBodyItem>{photoCnt} 종류</TableBodyItem>
      <TableBodyItem styles={{ paddingRight: "1.5em" }}>
        <section className="action-section">
          <IconButton icon={faPenToSquare} onClick={startEditor} />
          <Link to={`/admin/member/detail/${memberId}`}>
            <IconButton icon={faArrowRight} />
          </Link>
        </section>
      </TableBodyItem>
    </tr>
  );
}

export default MemberInfo;