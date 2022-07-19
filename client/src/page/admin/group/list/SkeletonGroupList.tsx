import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import TableBodyItem from '@component/table/TableBodyItem';

interface SkeletonGroupListProps {
  children?: React.ReactNode;
}

const SkeletonGroupListDefaultProps = {};

function SkeletonGroupList({ children }: SkeletonGroupListProps & typeof SkeletonGroupListDefaultProps) {
  return (
    <>
      {Array.from({length: 8}).map((_, idx) => (
        <tr key={idx}>
          <TableBodyItem paddingLeft="1.5em">
            <section className="name-section">
              <SkeletonItem width="60px" height="60px" marginRight="1em" />
              <SkeletonItem width="7em" />
            </section>
          </TableBodyItem>
          <TableBodyItem><SkeletonItem width="5em" /></TableBodyItem>
          <TableBodyItem paddingRight="1.5em">
            <section className="action-section">
              <SkeletonItem width="2em" marginLeft="1em" />
            </section>
          </TableBodyItem>
        </tr>
      ))}
    </>
  )
}

SkeletonGroupList.defaultProps = SkeletonGroupListDefaultProps;

export default SkeletonGroupList;