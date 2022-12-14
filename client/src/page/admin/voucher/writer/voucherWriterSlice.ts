import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = 'voucherWriter';
let nextId = 0;

// message는 유효성 검사 메시지
interface State {
  username: {
    value: string;
    message: string;
  };
  vouchers: {
    message: string;
    value: {
      id: number;
      photocardId: number;
      amount: number;
      message: string;
    }[];
  }
}

const initialState: State = {
  username: {
    value: '',
    message: ''
  },
  vouchers: {
    message: '',
    value: []
  }
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {

    // 초기값으로 초기화
    initialize: (state) => {
      Object.assign(state, initialState);
    },

    // 유효성 검사 메시지 초기화
    clearMessage: (state) => {
      state.username = { ...state.username, message: '' };
      state.vouchers = {
        message: '',
        value: state.vouchers.value.map((item) => ({ ...item, message: '' }))
      }
    },

    // 유효성 메시지 변경
    setMessage: (state, { payload }: PayloadAction<{type: keyof State; message: string;}>) => {
      state[payload.type].message = payload.message;
    },

    // 사용자 이름 변경
    setUsername: (state, { payload }: PayloadAction<string>) => {
      state.username.value = payload;
    },

    // 소유권 추가
    addVoucher: (state, { payload: photocardId }: PayloadAction<number>) => {
      if (!state.vouchers.value.find((element) => element.photocardId === photocardId)) {
        state.vouchers.value = state.vouchers.value.concat({
          id: nextId++,
          photocardId,
          amount: 1,
          message: ''
        });
      }
    },

    // 소유권 제거
    removeVoucher: (state, { payload: id }: PayloadAction<number>) => {
      state.vouchers.value = state.vouchers.value.filter(element => element.id !== id);
    },

    // 특정 소유권 유효성 메시지 변경
    setVoucherMessage: (state, { payload }: PayloadAction<{idx: number; message: string;}>) => {
      state.vouchers.value = state.vouchers.value.map((element, idx) =>
        idx === payload.idx ?
        { ...element, message: payload.message } :
        { ...element }
      );
    },

    // 소유권 수량 변경
    changeVoucherAmount: (state, { payload }: PayloadAction<{ id: number; amount: number;}>) => {
      state.vouchers.value = state.vouchers.value.map((element) =>
        element.id === payload.id ?
        { ...element, amount: payload.amount } :
        { ...element });
    }
  }
});

export const { initialize, clearMessage, setMessage, setUsername, addVoucher, setVoucherMessage, removeVoucher, changeVoucherAmount } = slice.actions;
export default slice.reducer;