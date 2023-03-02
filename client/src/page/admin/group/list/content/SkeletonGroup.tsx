import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';

function SkeletonGroup() {
  return (
    <tr className="Group">
      <td>
        <section className="name-section">
          <SkeletonItem styles={{ width: "60px", height: "60px"}} />
          <SkeletonItem styles={{ width: "7em" }} />
        </section>
      </td>
      <td><SkeletonItem styles={{ width: "5em" }} /></td>
      <td>
        <section className="action-section">
          <SkeletonItem styles={{ width: "2em", marginLeft: "1em" }} />
        </section>
      </td>
    </tr>
  );
}

export default SkeletonGroup;