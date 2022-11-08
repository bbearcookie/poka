import React from 'react';
import CardHeader from '@component/card/basic/CardHeader';
import IconButton from '@component/form/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faInfoCircle, faEdit, faClose, faUser, faHouse } from '@fortawesome/free-solid-svg-icons';

interface RecipientProps {
  children?: React.ReactNode;
}
const RecipientDefaultProps = {};

function Recipient({ children }: RecipientProps & typeof RecipientDefaultProps) {
  return (
    <CardHeader className="recipient-section">
      <h4 className="name">지하철</h4>
      <div className="content-section">
        <FontAwesomeIcon icon={faLocationDot} width="1.5em" height="1.5em" color="#2678F3" />
        <span className="text">경기도 뭐뭐시 머머동 머머머머의 머머아파트 301호</span>
      </div>
      <div className="content-section">
        <FontAwesomeIcon icon={faUser} width="1.5em" height="1.5em" color="#EC1B5A" />
        <span className="text">이상훈</span>
      </div>
      <div className="content-section">
        <FontAwesomeIcon icon={faPhone} width="1.5em" height="1.5em" color="#459A10" />
        <span className="text">010-1234-1234</span>
      </div>
      <div className="content-section">
        <FontAwesomeIcon icon={faInfoCircle} width="1.5em" height="1.5em" color="#F3E079" />
        <span className="text">직접 받고 부재시 문 앞</span>
      </div>
      <div className="icon-section">
        <IconButton width="1em" height="1em" icon={faHouse} tooltip="기본 배송지로 설정" styles={{ display: 'inline' }} />
        <IconButton width="1em" height="1em" icon={faEdit} tooltip="수정" styles={{ display: 'inline' }} />
        <IconButton width="1em" height="1em" icon={faClose} tooltip="삭제" styles={{ display: 'inline' }} />
      </div>
    </CardHeader>
  );
}

Recipient.defaultProps = RecipientDefaultProps;
export default Recipient;