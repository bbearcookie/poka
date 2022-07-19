import React from 'react';
import IconButton from '@component/form/IconButton';
import { faPenToSquare, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import TableBodyItem from '@component/table/TableBodyItem';

interface MemberInfoProps {
  idx: number;
  name: string;
  photoCnt: number;
  startEditor: (idx: number | boolean) => void;
  children?: React.ReactNode;
}

const MemberInfoDefaultProps = {};

function MemberInfo({ idx, name, photoCnt, startEditor, children }: MemberInfoProps & typeof MemberInfoDefaultProps) {
  return (
    <tr>
      <TableBodyItem paddingLeft="1.5em">{name}</TableBodyItem>
      <TableBodyItem>{photoCnt} 종류</TableBodyItem>
      <TableBodyItem paddingRight="1.5em">
        <section className="action-section">
          <IconButton icon={faPenToSquare} onClick={() => startEditor(idx)} />
          <IconButton icon={faArrowRight} />
        </section>
      </TableBodyItem>
    </tr>
  );
}

MemberInfo.defaultProps = MemberInfoDefaultProps;

export default MemberInfo;