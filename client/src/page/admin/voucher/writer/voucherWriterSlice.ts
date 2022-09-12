import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = 'voucherWriter';

interface State {
  username: string;
  vouchers: {
    photocardId: number;
    amount: number;
  }[];
}

const initialState: State = {
  username: '',
  vouchers: []
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    // 초기값으로 초기화
    initialize: (state) => {
      state.username = initialState.username;
      state.vouchers = initialState.vouchers;
    },

    // 사용자 이름 변경
    setUsername: (state, { payload }: PayloadAction<string>) => {
      state.username = payload;
    }
  }
});

export const { initialize, setUsername } = slice.actions;
export default slice.reducer;