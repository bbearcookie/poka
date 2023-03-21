import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

interface Props {
  className?: string;
  styles?: StylesProps;
}

function SkeletonItem({ className, styles }: Props) {
  return (
    <StyledItem
      className={classNames("SkeletonItem", className)}
      {...styles}
    />
  );
}

export default SkeletonItem;

// 스타일 컴포넌트
interface StylesProps {
  width?: string;
  maxWidth?: string;
  height?: string;
  padding?: string;
  margin?: string;
  marginLeft?: string;
  marginRight?: string;
  marginTop?: string;
  marginBottom?: string;
  backgroundColor?: string;
  borderRadius?: string;
  boxSizing?: string;
}
const StyledItem = styled.div<StylesProps>`
  width: ${p => p.width ? p.width : '5em'};
  max-width: ${p => p.maxWidth};
  height: ${p => p.height ? p.height : '1.25em'};
  padding: ${p => p.padding};
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};
  background-color: ${p => p.backgroundColor ? p.backgroundColor : 'gainsboro'};
  border-radius: ${p => p.borderRadius ? p.borderRadius : "10px"};
  box-sizing: ${p => p.boxSizing};
`;