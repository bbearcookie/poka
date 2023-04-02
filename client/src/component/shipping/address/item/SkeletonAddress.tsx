import SkeletonItem from '@component/skeleton/SkeletonItem';
import IconButton from '@component/form/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faInfoCircle, faEdit, faClose, faUser, faHouse } from '@fortawesome/free-solid-svg-icons';
import { StyledAddress, IconSection } from './_styles';

function SkeletonAddress() {
  return (
    <StyledAddress>
      <SkeletonItem styles={{ height: "1.35em", margin: "0 0 1em 0" }} />
      <div className="content-section">
        <FontAwesomeIcon icon={faLocationDot} width="1.5em" height="1.5em" color="#2678F3" />
        <SkeletonItem styles={{ width: "min(18em, 100%)", height: "1.35em", marginBottom: "0.5em" }} />
      </div>
      <div className="content-section">
        <FontAwesomeIcon icon={faUser} width="1.5em" height="1.5em" color="#EC1B5A" />
        <SkeletonItem styles={{ width: "min(6em, 100%)", height: "1.35em", marginBottom: "0.5em" }} />
      </div>
      <div className="content-section">
        <FontAwesomeIcon icon={faPhone} width="1.5em" height="1.5em" color="#459A10" />
        <SkeletonItem styles={{ width: "min(9em, 100%)", height: "1.35em", marginBottom: "0.5em" }} />
      </div>
      <div className="content-section">
        <FontAwesomeIcon icon={faInfoCircle} width="1.5em" height="1.5em" color="#F3E079" />
        <SkeletonItem styles={{ width: "min(13em, 100%)", height: "1.35em", marginBottom: "0.5em" }} />
      </div>
      <IconSection>
        <IconButton width="1em" height="1em" icon={faHouse} tooltip="기본 배송지로 설정" styles={{ display: 'inline' }} />
        <IconButton width="1em" height="1em" icon={faEdit} tooltip="수정" styles={{ display: 'inline' }} />
        <IconButton width="1em" height="1em" icon={faClose} tooltip="삭제" styles={{ display: 'inline' }} />
      </IconSection>
    </StyledAddress>
  );
}

export default SkeletonAddress;