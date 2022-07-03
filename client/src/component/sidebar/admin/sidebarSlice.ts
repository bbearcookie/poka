import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";

const name = 'adminSidebar';

interface State {
  activeURI: string;
  // parentActiveId: number;
  parentActiveId: string;
}

const initialState: State = {
  activeURI: 'none',
  // parentActiveId: 0,
  parentActiveId: 'none'
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
    }
  },
});

export const { changeActiveURI, changeParentActiveId } = slice.actions;
export default slice.reducer;