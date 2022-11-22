import React from 'react';
import styled from 'styled-components';

interface SkeletonItemProps {
  className?: string;
  styles?: StylesProps;
}
const SkeletonItemDefaultProps = {};
function SkeletonItem(p: SkeletonItemProps & typeof SkeletonItemDefaultProps) {
  return (
    <StyledItem className="SkeletonItem" {...StylesDefaultProps} {...p.styles} {...p} />
  );
}

SkeletonItem.defaultProps = SkeletonItemDefaultProps;
export default SkeletonItem;

// 스타일 컴포넌트
interface StylesProps {
  width?: string;
  maxWidth?: string;
  height?: string;
  margin?: string;
  marginLeft?: string;
  marginRight?: string;
  marginTop?: string;
  marginBottom?: string;
  backgroundColor?: string;
  borderRadius?: string;
}
const StylesDefaultProps = {
  width: '5em',
  height: '1.25em',
  backgroundColor: 'gainsboro',
  borderRadius: "10px",
};
const StyledItem = styled.div<StylesProps & typeof StylesDefaultProps>`
  width: ${p => p.width};
  max-width: ${p => p.maxWidth};
  height: ${p => p.height};
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};
  background-color: ${p => p.backgroundColor};
  border-radius: ${p => p.borderRadius};
`;