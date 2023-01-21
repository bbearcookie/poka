import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CLASS = 'BackLabel';
interface Props {
  className?: string;
  to?: string;
  onClick?: () => void;
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {
  to: '#'
};
function BackLabel({ className, to = DefaultProps.to, onClick, styles, children}: Props) {
  return (
    <StyledLabel {...styles}>
      <Link to={to} onClick={onClick}>
        <FontAwesomeIcon className={`${CLASS}__icon`} icon={faArrowLeft} />
        {children}
      </Link>
    </StyledLabel>
  );
}

export default BackLabel;

// 스타일 컴포넌트
interface StylesProps {
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
}
const StyledLabel = styled.div<StylesProps>`
  width: fit-content;
  padding: 0.5em;
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};

  &:hover { text-decoration: underline; }
  a { color: inherit; text-decoration: none; }
  .${CLASS}__icon { margin-right: 0.75em; }
`;