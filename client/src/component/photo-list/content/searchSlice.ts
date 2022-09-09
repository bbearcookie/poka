import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = 'photoSearch';
let nextId = 0;

type LabelDataType =
{ type: 'PHOTO_NAME'; value: string; } |
{ type: 'GROUP_ID'; value: number; } |
{ type: 'MEMBER_ID'; value: number; };

export type LabelType = {
  id: number;
  text: string;
  data: LabelDataType;
}

export const category = {
  'PHOTO_NAME': '포토카드 이름',
  'GROUP_ID': '그룹',
  'MEMBER_ID': '멤버'
}

interface State {
  labels: LabelType[];
}

const initialState: State = {
  labels: [],
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    // 새로운 라벨 추가하는 함수
    addLabel: (state, { payload }: PayloadAction<{ text: string; data: LabelDataType }>) => {
      state.labels = state.labels.concat({
        id: nextId++,
        text: payload.text,
        data: payload.data
      });
    },

    // 라벨 제거하는 함수
    removeLabel: (state, { payload: id }: PayloadAction<number>) => {
      state.labels = state.labels.filter((item) => item.id !== id);
    },

    // 라벨이 이미 있으면 제거하고, 아직 없으면 추가하는 함수
    toggleLabel: (state, { payload }: PayloadAction<{ text: string; data: LabelDataType; }>) => {
      // 이미 들어있는 내용이면 라벨에서 제거
      if (state.labels.find((item) => item.data.type === payload.data.type && item.data.value === payload.data.value)) {
        state.labels = state.labels.filter((item) => !(item.data.type === payload.data.type && item.data.value === payload.data.value));
      // 들어있지 않은 내용이면 라벨에 추가
      } else {
        state.labels = state.labels.concat({
          id: nextId++,
          text: payload.text,
          data: payload.data
        });
      }
    },

  }
});

export const { addLabel, removeLabel, toggleLabel } = slice.actions;
export default slice.reducer;