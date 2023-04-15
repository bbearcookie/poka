import useGroupsQuery from '@api/query/group/useGroupsQuery';
import { Action } from '@component/search/content/filter/reducer';

interface Props {
  dispatch: React.Dispatch<Action>;
}

// 그룹 데이터 가져오고 초기 필터 상태 설정
export default function useInitGroup({ dispatch }: Props) {
  return useGroupsQuery({
    onSuccess: res => {
      dispatch({
        type: 'INIT_GROUPS',
        groups: res.groups.map(g => {
          return { id: g.groupId, name: g.name, checked: false };
        }),
      });
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
}
