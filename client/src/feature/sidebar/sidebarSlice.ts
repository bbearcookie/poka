import { createSlice } from '@reduxjs/toolkit';

const name = 'newSidebar';

interface State {
  activeId: number;
}

const initialState: State = {
  activeId: 0,
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    setActiveId: (state, action) => {
      state.activeId = action.payload;
    }
  }
});

export const { setActiveId } = slice.actions;

export default slice.reducer;