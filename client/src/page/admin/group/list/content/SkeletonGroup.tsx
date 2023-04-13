import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import { StyledGroup } from './_styles';

function SkeletonGroup() {
  return (
    <StyledGroup>
      <td>
        <section className="name-section">
          <SkeletonItem styles={{ width: "60px", height: "60px"}} />
          <SkeletonItem styles={{ width: "7em", height: "2em" }} />
        </section>
      </td>
      <td><SkeletonItem styles={{ width: "5em", height: "2em" }} /></td>
      <td>
        <section className="action-section">
          <SkeletonItem styles={{ width: "2em", height: "2em", marginLeft: "1em" }} />
        </section>
      </td>
    </StyledGroup>
  );
}

export default SkeletonGroup;