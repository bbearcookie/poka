import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import SkeletonUserProfile from '@component/profile/SkeletonUserProfile';

interface Props {}
const DefaultProps = {};

function SkeletonLog({  }: Props) {
  return (
    <li className="log">
      <div className="line">
        <div className="subtitle"><SkeletonItem styles={{ height: "1.35em" }} /></div>
        <div className="body"><SkeletonItem styles={{ width: "3em", height: "2.35em" }} /></div>
      </div>
      <div className="line">
        <div className="subtitle"><SkeletonItem styles={{ height: "1.35em" }} /></div>
        <div className="body"><SkeletonItem styles={{ width: "10em", height: "1.35em" }} /></div>
      </div>
      <div className="line">
        <div className="subtitle"><SkeletonItem styles={{ height: "1.35em" }} /></div>
        <div className="body"><SkeletonUserProfile /></div>
      </div>
      <div className="line">
        <div className="subtitle"><SkeletonItem styles={{ height: "1.35em" }} /></div>
        <div className="body"><SkeletonUserProfile /></div>
      </div>
    </li>
  );
}

export default SkeletonLog;