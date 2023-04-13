import SkeletonItem from '@component/skeleton/SkeletonItem';
import IconButton from '@component/form/iconButton/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faInfoCircle, faEdit, faClose, faUser, faHouse } from '@fortawesome/free-solid-svg-icons';
import { StyledAddress, IconSection } from './_styles';

function SkeletonAddress() {
  return (
    <StyledAddress>
      <SkeletonItem styles={{ width: "min(10em, 100%)", height: "1.35em", margin: "0 0 1em 0" }} />
      <div className="content-section">
        <FontAwesomeIcon icon={faLocationDot} width="1.5em" height="1.5em" color="#2678F3" />
        <SkeletonItem styles={{ width: "min(10em, 100%)", height: "1.35em", marginBottom: "0.5em" }} />
      </div>
      <div className="content-section">
        <FontAwesomeIcon icon={faUser} width="1.5em" height="1.5em" color="#EC1B5A" />
        <SkeletonItem styles={{ width: "min(10em, 100%)", height: "1.35em", marginBottom: "0.5em" }} />
      </div>
      <div className="content-section">
        <FontAwesomeIcon icon={faPhone} width="1.5em" height="1.5em" color="#459A10" />
        <SkeletonItem styles={{ width: "min(10em, 100%)", height: "1.35em", marginBottom: "0.5em" }} />
      </div>
      <div className="content-section">
        <FontAwesomeIcon icon={faInfoCircle} width="1.5em" height="1.5em" color="#F3E079" />
        <SkeletonItem styles={{ width: "min(10em, 100%)", height: "1.35em", marginBottom: "0.5em" }} />
      </div>
      <IconSection>
        <IconButton iconProps={{ icon: faHouse, width: "1em", height: "1em" }} tooltip="기본 배송지로 설정" />
        <IconButton iconProps={{ icon: faEdit, width: "1em", height: "1em" }} tooltip="수정" />
        <IconButton iconProps={{ icon: faClose, width: "1em", height: "1em" }} tooltip="삭제" />
      </IconSection>
    </StyledAddress>
  );
}

export default SkeletonAddress;