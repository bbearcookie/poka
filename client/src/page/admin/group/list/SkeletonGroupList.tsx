import React from 'react';
import './SkeletonGroupList.scss';

interface SkeletonGroupListProps {
  children?: React.ReactNode;
}

const SkeletonGroupListDefaultProps = {};

function SkeletonGroupList({ children }: SkeletonGroupListProps & typeof SkeletonGroupListDefaultProps) {
  return (
    <>
      {Array.from({length: 8}).map((_, idx) => (
        <tr className="Skeleton" key={idx}>
          <td>
            <section className="name-section">
              <span className="image" />
              <span className="name" />
            </section>
          </td>
          <td>
            <span className="member-count" />
          </td>
          <td>
            <section className="action-section">
              <span className="icon-button" />
            </section>
          </td>
        </tr>
      ))}
    </>
  )
}

SkeletonGroupList.defaultProps = SkeletonGroupListDefaultProps;

export default SkeletonGroupList;