import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import SkeletonUserProfile from '@component/profile/SkeletonUserProfile';

function SkeletonShipping() {
  return (
    <tr>
      <td><SkeletonUserProfile /></td>
      <td><SkeletonItem styles={{ width: "5em", height: "1em", padding: "0.5em" }} /></td>
      <td><SkeletonItem styles={{ width: "5em", height: "1em", padding: "0.5em" }} /></td>
      <td><SkeletonItem styles={{ width: "3em", height: "0.5em", padding: "0.5em" }} /></td>
      <td><SkeletonItem styles={{ width: "7em", height: "0.5em", padding: "0.5em" }} /></td>
      <td></td>
    </tr>
  );
}

export default SkeletonShipping;