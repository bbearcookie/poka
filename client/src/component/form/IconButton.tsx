import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  icon: IconDefinition;
  tooltip?: string;
  size?: SizeProp;
  width?: string;
  height?: string;
  onClick?: React.MouseEventHandler;
  styles?: StylesProps;
}
const DefaultProps = {
  onClick: (e: React.MouseEvent) => { return; }
};
function IconButton({ icon, tooltip, size, width, height, styles, onClick = DefaultProps.onClick }: Props) {
  const [buttonElement, buttonRef] = useState<HTMLElement | null>(null);
  const [menuElement, menuRef] = useState<HTMLElement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const popper = usePopper(buttonElement, menuElement);

  return (
    <StyledIconButton
      {...styles}
      className="IconButton"
      onMouseOver={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={onClick}
      ref={buttonRef}
    >
      <FontAwesomeIcon icon={icon} size={size} width={width} height={height} />
      {tooltip &&
      <Tooltip
        className={classNames({"show": showTooltip})}
        ref={menuRef}
        style={popper.styles.popper}
        {...popper.attributes.popper}
      >{tooltip}</Tooltip>}
    </StyledIconButton>
  );
}

export default IconButton;

// 스타일 컴포넌트
interface StylesProps {
  display?: string;
}
const StyledIconButton = styled.div<StylesProps>`
  display: ${p => p.display};
  color: gray;
  padding: 0.5rem;
  border-radius: 0.3rem;
  transition: all 0.5s;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: inherit;
    background-color: rgb(249, 249, 250);
  }
`

const Tooltip = styled.div`
  visibility: hidden;

  &.show {
    transition-delay: 0.5s;
    visibility: visible;
    padding: 0.4em;
    border-radius: 5px;
    background-color: gray;
    color: white;
    font-size: 0.75rem;
  }
`;