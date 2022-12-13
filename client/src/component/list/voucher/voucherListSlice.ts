import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupType, MemberType } from "@component/list/common/filter/DataType";
import { VoucherStateType } from "@component/list/common/filter/DataType";
const name = 'voucherList';

export type SearchKeywordsType = 'PHOTO_NAME' | 'USER_NAME';
export const SearchKeywords: {
  [k in SearchKeywordsType]: string;
} = {
  'PHOTO_NAME': '포토카드 이름',
  'USER_NAME': '사용자 아이디'
}
export interface FilterType {
  names: {
    id: number;
    value: string;
  }[];
  usernames: {
    id: number;
    value: string;
  }[];
  groups: GroupType[];
  members: MemberType[];
  state: VoucherStateType; // 소유권 상태
}

let nextId = 0; // names 추가/삭제에 사용되는 변수
interface State {
  filter: FilterType;
}

const initialState: State = {
  filter: {
    names: [],
    usernames: [],
    groups: [],
    members: [],
    state: 'ALL'
  }
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    // 상태 초기화
    initialize: (state) => {
      state.filter = initialState.filter;
    },

    // 그룹 정보 설정
    setGroups: (state, { payload }: PayloadAction<{
      groupId: number;
      name: string;
      checked: boolean;
    }[]>) => {
      state.filter.groups = payload.map((data) => ({ ...data }));
    },

    // 멤버 정보 설정
    setMembers: (state, { payload }: PayloadAction<{
      memberId: number;
      name: string;
      checked: boolean;
    }[]>) => {
      state.filter.members = payload.map((data) => ({ ...data }));
    },

    // 소유권 상태 필터 설정
    setVoucherState: (state, { payload }: PayloadAction<VoucherStateType>) => {
      state.filter.state = payload;
    },

    // 그룹 선택 토글
    toggleGroup: (state, { payload: groupId }: PayloadAction<number>) => {
      state.filter.groups = state.filter.groups.map(
        (item) => item.groupId === groupId ?
        { ...item, checked: !item.checked }:
        { ...item }
      )
    },

    // 멤버 선택 토글
    toggleMember: (state, { payload: memberId }: PayloadAction<number>) => {
      state.filter.members = state.filter.members.map(
        (item) => item.memberId === memberId ?
        { ...item, checked: !item.checked }:
        { ...item }
      )
    },

    // 키워드 필터 추가
    addKeyword: (state, { payload }: PayloadAction<{
      type: SearchKeywordsType,
      value: string
    }>) => {
      const keyword = { id: nextId, value: payload.value };

      switch (payload.type) {
        case 'PHOTO_NAME':
          state.filter.names = state.filter.names.concat(keyword);
          nextId++;
          break;
        case 'USER_NAME':
          state.filter.usernames = state.filter.usernames.concat(keyword);
          nextId++;
          break;
        default:
          break;
      }
    },

    // 키워드 삭제
    removeKeyword: (state, { payload }: PayloadAction<{
      type: SearchKeywordsType,
      id: number
    }>) => {
      switch (payload.type) {
        case 'PHOTO_NAME':
          state.filter.names = state.filter.names.filter((item) => item.id !== payload.id);
          break;
        case 'USER_NAME':
          state.filter.usernames = state.filter.usernames.filter((item) => item.id !== payload.id);
          break;
        default:
          break;
      }
    }

  }
});

export const { initialize, setGroups, setMembers, setVoucherState, toggleGroup, toggleMember, addKeyword, removeKeyword } = slice.actions;
export default slice.reducer;