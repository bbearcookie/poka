import { createSlice } from "@reduxjs/toolkit";

const name = 'adminSidebar';

interface State {
  activeURI: string;
  parentActiveId: string;
  show: boolean; // 작은 화면에서 사이드바 보여주기/숨김
}

const initialState: State = {
  activeURI: 'none',
  parentActiveId: 'none',
  show: false
};

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    changeActiveURI: (state, { payload }) => {
      state.activeURI = payload;
    },
    changeParentActiveId: (state, { payload }) => {
      state.parentActiveId = payload;
    },
    changeShow: (state, { payload }) => {
      state.show = payload;
    }
  },
});

export const { changeActiveURI, changeParentActiveId, changeShow } = slice.actions;
export default slice.reducer;