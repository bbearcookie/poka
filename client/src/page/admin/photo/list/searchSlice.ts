import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = 'adminPhotoSearch';
let nextId = 0;
interface State {
  keywords: {
    id: number;
    data: {
      type: 'PHOTO_NAME';
      value: string;
    } | {
      type: 'GROUP_ID';
      value: number;
    } | {
      type: 'MEMBER_ID';
      value: number;
      groupId: number;
    }
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
        state.keywords = state.keywords.filter(item => 
          !(item.data.type === 'GROUP_ID' && item.data.value === groupId));
        state.groupIdList = state.groupIdList.filter(item => item !== groupId);

      // 아직 선택되지 않은 그룹이면 필터에 추가
      } else {
        state.keywords = state.keywords.concat({
          id: nextId++,
          data: {
            type: 'GROUP_ID',
            value: groupId
          }
        });
        state.groupIdList = state.groupIdList.concat(groupId);
      }
    }

  }
});

export const { setPhotoName, setGroupId } = slice.actions
export default slice.reducer;