import React from 'react';
import GroupSelector from './content/GroupSelector';
import MemberSelector from './content/MemberSelector';
import { IdolSelectorHook } from './useIdolSelector';
import { StyledIdolSelector } from './_styles';

interface Props {
  hook: IdolSelectorHook;
}

function IdolSelector({ hook }: Props) {
  return (
    <StyledIdolSelector margin="0 0 2em 0">
      <GroupSelector {...hook} />
      <MemberSelector {...hook} />
    </StyledIdolSelector>
  );
}

export default IdolSelector;
