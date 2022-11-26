import React from 'react';
import { Profile } from './UserProfile';
import SkeletonItem from '@component/skeleton/SkeletonItem';

interface SkeletonUserProfileProps {
  children?: React.ReactNode;
}
const SkeletonUserProfileDefaultProps = {};

function SkeletonUserProfile({ children }: SkeletonUserProfileProps & typeof SkeletonUserProfileDefaultProps) {
  return (
    <Profile>
      <SkeletonItem
        styles={{
          width: "75px",
          height: "75px",
          borderRadius: "50px"
        }}
      />
      <div>
        <SkeletonItem styles={{ margin: "0.5rem 0" }} />
        <SkeletonItem styles={{ margin: "0.5rem 0" }} />
      </div>
    </Profile>
  );
}

SkeletonUserProfile.defaultProps = SkeletonUserProfileDefaultProps;
export default SkeletonUserProfile;