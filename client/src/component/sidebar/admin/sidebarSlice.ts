import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const name = 'adminSidebar';

interface State {
  activeId: number;
  parentActiveId: number;
}

const initialState: State = {
  activeId: 0,
  parentActiveId: 0,
};

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    changeActiveId: (state, { payload }) => {
      state.activeId = payload;
    },
    changeParentActiveId: (state, { payload }) => {
      state.parentActiveId = payload;
    }
  },
});

export const { changeActiveId, changeParentActiveId } = slice.actions;
export default slice.reducer;