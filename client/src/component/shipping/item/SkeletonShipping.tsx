import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import SkeletonUserProfile from '@component/profile/SkeletonUserProfile';

interface Props {
  showOwner?: boolean
}

function SkeletonShipping({ showOwner = false }: Props) {
  return (
    <tr>
      {showOwner && <td><SkeletonUserProfile /></td>}
      <td><SkeletonItem styles={{ width: "4.7em", height: "7em" }} /></td>
      <td><SkeletonItem styles={{ width: "5em", height: "1em", padding: "0.5em" }} /></td>
      <td><SkeletonItem styles={{ width: "5em", height: "1em", padding: "0.5em" }} /></td>
      <td><SkeletonItem styles={{ width: "7em", height: "0.5em", padding: "0.5em", marginLeft: "auto" }} /></td>
    </tr>
  );
}

export default SkeletonShipping;