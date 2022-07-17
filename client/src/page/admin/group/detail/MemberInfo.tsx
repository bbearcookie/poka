import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface MemberInfoProps {
  name: string;
  photoCnt: number;
  startEditor: () => void;
  children?: React.ReactNode;
}

const MemberInfoDefaultProps = {};

function MemberInfo({ name, photoCnt, startEditor, children }: MemberInfoProps & typeof MemberInfoDefaultProps) {
  return (
    <tr>
      <td>{name}</td>
      <td>{photoCnt} 종류</td>
      <td>
        <section className="action-section">
          <div className="icon-button" onClick={startEditor}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
          <div className="icon-button">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </section>
      </td>
    </tr>
  );
}

MemberInfo.defaultProps = MemberInfoDefaultProps;

export default MemberInfo;