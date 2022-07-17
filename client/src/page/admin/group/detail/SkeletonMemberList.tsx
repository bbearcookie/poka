import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';

interface SkeletonMemberListProps {
  children?: React.ReactNode;
}

const SkeletonMemberListDefaultProps = {};

function SkeletonMemberList({ children }: SkeletonMemberListProps & typeof SkeletonMemberListDefaultProps) {
  return (
    <>
      {Array.from({length: 8}).map((_, idx) => (
        <tr key={idx}>
          <td><SkeletonItem width="15em" /></td>
          <td><SkeletonItem width="5em" /></td>
          <td>
            <section className="action-section">
              <SkeletonItem width="2em" marginLeft="1em" />
              <SkeletonItem width="2em" marginLeft="1em" />
            </section>
          </td>
        </tr>
      ))}
    </>
  );
}

SkeletonMemberList.defaultProps = SkeletonMemberListDefaultProps;

export default SkeletonMemberList;