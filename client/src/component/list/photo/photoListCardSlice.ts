import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = 'photoListCard';

let nextId = 0; // names 추가/삭제에 사용되는 변수
export interface FilterType {
  names: {
    id: number;
    value: string;
  }[];
  groups: {
    groupId: number;
    name: string;
    checked: boolean;
  }[];
  members: {
    memberId: number;
    name: string;
    checked: boolean;
  }[];
}
interface State {
  filter: FilterType
}

const initialState: State = {
  filter: {
    names: [],
    groups: [],
    members: []
  }
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    // 상태 초기화
    initialize: (state) => {
      state = initialState
    },

    // 그룹 정보 설정
    setGroups: (state, { payload }: PayloadAction<{
      groupId: number;
      name: string;
    }[]>) => {
      state.filter.groups = payload.map((data) => ({ ...data, checked: false }));
    },

    // 멤버 정보 설정
    setMembers: (state, { payload }: PayloadAction<{
      memberId: number;
      name: string;
    }[]>) => {
      state.filter.members = payload.map((data) => ({ ...data, checked: false }));
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

    // 포토카드 이름 필터 추가
    addName: (state, { payload }: PayloadAction<string>) => {
      if (!payload) return;
      if (state.filter.names.find((item) => item.value === payload)) return;

      state.filter.names = state.filter.names.concat({
        id: nextId++,
        value: payload.trim()
      });
    },

    // 포토카드 이름 필터 제거
    removeName: (state, { payload: id }: PayloadAction<number>) => {
      state.filter.names = state.filter.names.filter((item) => item.id !== id);
    }
  }
})

export const { initialize, setGroups, setMembers, toggleGroup, toggleMember, addName, removeName } = slice.actions;
export default slice.reducer;