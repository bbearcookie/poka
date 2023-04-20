import { useEffect } from 'react';
import useMembersQuery from '@api/query/member/useMembersQuery';
import { State, Action } from '@component/search/content/filter/reducer';

interface Props {
  enabled: boolean;
  state: State;
  defaultMemberIds?: number[];
  dispatch: React.Dispatch<Action>;
  handleInitialize: () => void;
}

// 멤버 데이터 가져오고 초기 필터 상태 설정
export default function useInitMember({ enabled, state, defaultMemberIds = [], dispatch, handleInitialize }: Props) {
  const query = useMembersQuery({ enabled });
  const { data: members, status } = query;

  useEffect(() => {
    if (state.groups.length === 0) return;
    if (status !== 'success') return;

    // 그룹 선택 필터에서 선택한 그룹 ID
    let selectedGroups = state.groups.filter(g => g.checked).map(g => g.id);

    dispatch({
      type: 'INIT_MEMBERS',
      members: members.members
        .filter(m => selectedGroups.includes(m.groupId))
        .map(m => ({
          id: m.memberId,
          name: m.name,
          checked:
            state.members.find(item => item.id === m.memberId)?.checked || defaultMemberIds.includes(m.memberId)
              ? true
              : false,
        })),
    });

    handleInitialize();
  }, [state.groups, status]);

  return query;
}
