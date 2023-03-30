import React, { useState } from 'react';

export interface IdolSelectorHook {
  groupId: number;
  memberId: number;
  setGroupId: React.Dispatch<React.SetStateAction<number>>;
  setMemberId: React.Dispatch<React.SetStateAction<number>>;
}

function useIdolSelector(): IdolSelectorHook {
  const [groupId, setGroupId] = useState(0);
  const [memberId, setMemberId] = useState(0);

  return { groupId, setGroupId, memberId, setMemberId };
}

export default useIdolSelector;
