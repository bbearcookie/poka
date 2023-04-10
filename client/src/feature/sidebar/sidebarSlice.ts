import { createSlice } from '@reduxjs/toolkit';

const name = 'newSidebar';

interface State {
  activeId: number;
  isOpened: boolean;
}

const initialState: State = {
  activeId: 0,
  isOpened: false,
};

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    setActiveId: (state, action) => {
      state.activeId = action.payload;
    },
    setIsOpened: (state, action) => {
      state.isOpened = action.payload;
    },
  },
});

export const { setActiveId, setIsOpened } = slice.actions;

export default slice.reducer;
