import React from 'react';
import { Profile } from './UserProfile';
import SkeletonItem from '@component/skeleton/SkeletonItem';

function SkeletonUserProfile() {
  return (
    <Profile>
      <SkeletonItem
        styles={{
          width: '75px',
          height: '75px',
          borderRadius: '50px',
        }}
      />
      <div>
        <SkeletonItem styles={{ width: '7em', height: '1.5em', margin: '0.5rem 0' }} />
        <SkeletonItem styles={{ width: '7em', height: '1.5em', margin: '0.5rem 0' }} />
      </div>
    </Profile>
  );
}

export default SkeletonUserProfile;
