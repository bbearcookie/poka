import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = 'adminPhotoSearch';
let nextId = 0;
interface State {
  keywords: {
    id: number;
    data: {
      type: 'PHOTO_NAME';
      value: string;
    }
    // | {
    //   type: 'GROUP_ID';
    //   value: number;
    // } | {
    //   type: 'MEMBER_ID';
    //   value: number;
    //   groupId: number;
    // }
  }[];
  groupIdList: number[];
  memberIdList: number[];
}

const initialState: State = {
  keywords: [],
  groupIdList: [],
  memberIdList: []
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    setPhotoName: (state, { payload: value }: PayloadAction<string>) => {
      const keywords = state.keywords.filter((item) => item.data.type !== 'PHOTO_NAME');

      state.keywords = keywords.concat({
        id: nextId++,
        data: {
          type: 'PHOTO_NAME',
          value
        }
      });
    },

    setGroupId: (state, { payload: groupId }: PayloadAction<number>) => {
      // 이미 선택된 그룹이면 필터에서 제거
      if (state.groupIdList.includes(groupId)) {
        state.groupIdList = state.groupIdList.filter(item => item !== groupId);
      // 아직 선택되지 않은 그룹이면 필터에 추가
      } else {
        state.groupIdList = state.groupIdList.concat(groupId);
      }
    },

    setMemberId: (state, { payload: memberId }: PayloadAction<number>) => {
      // 이미 선택된 멤버이면 필터에서 제거
      if (state.memberIdList.includes(memberId)) {
        state.memberIdList = state.memberIdList.filter(item => item !== memberId);
      // 아직 선택되지 않은 그룹이면 필터에 추가
      } else {
        state.memberIdList = state.memberIdList.concat(memberId);
      }
    }

  }
});

export const { setPhotoName, setGroupId, setMemberId } = slice.actions
export default slice.reducer;