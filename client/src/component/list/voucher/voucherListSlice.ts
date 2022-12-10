import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = 'voucherList';

export type VoucherStateType = 'ALL' | 'AVAILABLE' | 'TRADING' | 'SHIPPING' | 'SHIPPED';
export const VoucherStateName: {
  [k in VoucherStateType]: string;
} = {
    'ALL': '전체',
    'AVAILABLE': '교환가능',
    'TRADING': '교환중',
    'SHIPPING': '배송대기중',
    'SHIPPED': '배송완료'
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
      state = initialState;
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

    // 소유권 상태 필터 선택
    changeVoucherFilter: (state, { payload }: PayloadAction<VoucherStateType>) => {
      state.filter.state = payload;
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

    // 사용자 이름 필터 추가
    addUsername: (state, { payload }: PayloadAction<string>) => {
      if (!payload) return;
      if (state.filter.usernames.find((item) => item.value === payload)) return;

      state.filter.usernames = state.filter.usernames.concat({
        id: nextId++,
        value: payload.trim()
      });
    },

    // 포토카드 이름 필터 제거
    removeName: (state, { payload: id }: PayloadAction<number>) => {
      state.filter.names = state.filter.names.filter((item) => item.id !== id);
    },

    // 사용자 이름 필터 제거
    removeUsername: (state, { payload: id }: PayloadAction<number>) => {
      state.filter.usernames = state.filter.usernames.filter((item) => item.id !== id);
    },

  }
});

export const {
  initialize, setGroups, setMembers, toggleGroup, toggleMember, changeVoucherFilter,
  addName, addUsername, removeName, removeUsername } = slice.actions;
export default slice.reducer;