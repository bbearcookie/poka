import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { StyledItem } from '../_styles';

export interface Props {
  className?: string;
  to?: string;
  text?: string;
  icon?: IconDefinition;
  onClick?: () => void;
}

export function ChildItem({ className, to = '#', text, icon, onClick }: Props) {
  const navigate = useNavigate();

  const handleChangeURI = useCallback(() => {
    onClick && onClick();
    navigate(to);
  }, [to, navigate, onClick]);

  return (
    <StyledItem className={className} onClick={handleChangeURI}>
      {icon && <FontAwesomeIcon icon={icon} width="1em" height="1em" />}
      <span className="text">{text}</span>
    </StyledItem>
  );
}

export default ChildItem;
