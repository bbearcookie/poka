import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = 'voucherWriter';
let nextId = 0;

interface State {
  username: string;
  vouchers: {
    id: number;
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
    },

    // 소유권 추가
    addVoucher: (state, { payload: photocardId }: PayloadAction<number>) => {
      if (!state.vouchers.find((element) => element.photocardId === photocardId)) {
        state.vouchers = state.vouchers.concat({
          id: nextId++,
          photocardId,
          amount: 0
        });
      }
    },

    // 소유권 제거
    removeVoucher: (state, { payload: id }: PayloadAction<number>) => {
      state.vouchers = state.vouchers.filter(element => element.id !== id);
    },

    // 소유권 수량 변경
    changeVoucherAmount: (state, { payload }: PayloadAction<{ id: number; amount: number;}>) => {
      state.vouchers = state.vouchers.map((element) =>
        element.id === payload.id ?
        { ...element, amount: payload.amount } :
        { ...element });
    }
  }
});

export const { initialize, setUsername, addVoucher, removeVoucher, changeVoucherAmount } = slice.actions;
export default slice.reducer;