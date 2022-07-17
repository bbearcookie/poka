import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';

interface SkeletonGroupListProps {
  children?: React.ReactNode;
}

const SkeletonGroupListDefaultProps = {};

function SkeletonGroupList({ children }: SkeletonGroupListProps & typeof SkeletonGroupListDefaultProps) {
  return (
    <>
      {Array.from({length: 8}).map((_, idx) => (
        <tr key={idx}>
          <td>
            <section className="name-section">
              <SkeletonItem width="60px" height="60px" marginRight="1em" />
              <SkeletonItem width="7em" />
            </section>
          </td>
          <td><SkeletonItem width="5em" /></td>
          <td>
            <section className="action-section">
              <SkeletonItem width="2em" marginLeft="1em" />
            </section>
          </td>
        </tr>
      ))}
    </>
  )
}

SkeletonGroupList.defaultProps = SkeletonGroupListDefaultProps;

export default SkeletonGroupList;