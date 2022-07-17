import React from 'react';
import styled from 'styled-components';

interface SkeletonItemProps {
  className?: string;
  width?: string;
  height?: string;
  margin?: string;
  marginLeft?: string;
  marginRight?: string;
  marginTop?: string;
  marginBottom?: string;
}

const SkeletonItemDefaultProps = {
  width: '5em',
  height: '1.25em'
};

function SkeletonItem
({ className, width, height, margin, marginTop, marginBottom, marginLeft, marginRight }: 
SkeletonItemProps & typeof SkeletonItemDefaultProps) {
  return (
    <StyledItem 
      className={className} width={width} height={height}
      margin={margin} marginTop={marginTop} marginBottom={marginBottom} marginLeft={marginLeft} marginRight={marginRight}
    />
  );
}

SkeletonItem.defaultProps = SkeletonItemDefaultProps;
export default SkeletonItem;

// 스타일 컴포넌트
const StyledItem = styled.div<SkeletonItemProps>`
  width: ${p => p.width};
  height: ${p => p.height};
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};
  background-color: gainsboro;
  border-radius: 10px;
`;