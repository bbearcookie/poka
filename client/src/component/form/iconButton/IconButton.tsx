import React, { useState, useCallback } from 'react';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

interface Props {
  iconProps: FontAwesomeIconProps;
  tooltip?: string;
  onClick?: React.MouseEventHandler;
}

function IconButton({ iconProps, tooltip, onClick, ...rest }: Props) {
  const [button, setButton] = useState<HTMLElement | null>(null);
  const [menu, setMenu] = useState<HTMLElement | null>(null);
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  const popper = usePopper(button, menu);

  const onMouseOver = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsShowTooltip(true);
  }, []);

  const onMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsShowTooltip(false);
  }, []);

  return (
    <span
      {...rest}
      ref={setButton}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <FontAwesomeIcon {...iconProps} />
      {tooltip && (
        <Tooltip
          className={classNames({ isShow: isShowTooltip })}
          ref={setMenu}
          style={popper.styles.popper}
          {...popper.attributes.popper}
        >
          {tooltip}
        </Tooltip>
      )}
    </span>
  );
}

export default styled(IconButton)<Props>`
  display: inline-block;
  padding: 0.5rem;
  border-radius: 0.3rem;
  color: gray;
  cursor: pointer;
  user-select: none;
  transition: all 0.5s;

  &:hover {
    color: inherit;
    background-color: rgb(249, 249, 250);
  }
`;

const Tooltip = styled.span`
  visibility: hidden;

  &.isShow {
    transition-delay: 0.5s;
    visibility: visible;
    padding: 0.4em;
    border-radius: 5px;
    background-color: gray;
    color: white;
    font-size: 0.75rem;
  }
`;
