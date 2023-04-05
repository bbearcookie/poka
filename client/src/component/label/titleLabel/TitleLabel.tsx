import React from 'react';
import { TitleLabel as StyledTitleLabel, Props as StylesProps } from './_styles';

interface Props {
  title?: string;
  styles?: StylesProps;
  children?: React.ReactNode;
}

function TitleLabel({ title, styles, children }: Props) {
  return (
    <StyledTitleLabel {...styles}>
      <h1 className="title">{title}</h1>
      {children}
    </StyledTitleLabel>
  );
}

export default TitleLabel;
