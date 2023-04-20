import useGroupsQuery from '@api/query/group/useGroupsQuery';
import { Action } from '@component/search/content/filter/reducer';

interface Props {
  defaultGroupIds?: number[];
  dispatch: React.Dispatch<Action>;
}

// 그룹 데이터 가져오고 초기 필터 상태 설정
export default function useInitGroup({ defaultGroupIds = [], dispatch }: Props) {
  return useGroupsQuery({
    onSuccess: res => {
      dispatch({
        type: 'INIT_GROUPS',
        groups: res.groups.map(g => ({
          id: g.groupId,
          name: g.name,
          checked: defaultGroupIds.includes(g.groupId) ? true : false,
        })),
      });
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
}
