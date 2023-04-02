import SkeletonItem from '@component/skeleton/SkeletonItem';
import { StyledUserProfile } from './_styles';

function SkeletonUserProfile() {
  return (
    <StyledUserProfile>
      <SkeletonItem
        styles={{
          width: '5em',
          height: '5em',
          borderRadius: '50%',
        }}
      />
      <div className="user-section">
        <SkeletonItem styles={{ width: '7em', height: '1.5em', margin: '0.5rem 0' }} />
        <SkeletonItem styles={{ width: '7em', height: '1.5em', margin: '0.5rem 0' }} />
      </div>
    </StyledUserProfile>
  );
}

export default SkeletonUserProfile;
