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
}

const initialState: State = {
  keywords: []
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
    }
  }
});

export const { setPhotoName } = slice.actions
export default slice.reducer;