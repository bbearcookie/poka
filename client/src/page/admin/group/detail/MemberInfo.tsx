import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@component/form/IconButton';
import { faPenToSquare, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import TableBodyItem from '@component/table/TableBodyItem';

interface MemberInfoProps {
  idx: number;
  memberId: number;
  name: string;
  photoCnt: number;
  startEditor: (idx: number | boolean) => void;
  children?: React.ReactNode;
}
const MemberInfoDefaultProps = {};

function MemberInfo({ idx, memberId, name, photoCnt, startEditor, children }: MemberInfoProps & typeof MemberInfoDefaultProps) {
  return (
    <tr>
      <TableBodyItem styles={{ paddingLeft: "1.5em" }}>
        <Link to={`/admin/member/detail/${memberId}`}>
          {name}
        </Link>
      </TableBodyItem>
      <TableBodyItem>{photoCnt} 종류</TableBodyItem>
      <TableBodyItem styles={{ paddingLeft: "1.5em" }}>
        <section className="action-section">
          <IconButton icon={faPenToSquare} onClick={() => startEditor(idx)} />
          <Link to={`/admin/member/detail/${memberId}`}>
            <IconButton icon={faArrowRight} />
          </Link>
        </section>
      </TableBodyItem>
    </tr>
  );
}

MemberInfo.defaultProps = MemberInfoDefaultProps;
export default MemberInfo;