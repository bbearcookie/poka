import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginTokenPayloadType } from "@type/user";
import { saveUser, removeUser } from './auth';

const name = 'auth';

interface State extends LoginTokenPayloadType {}

const initialState: State = {
  userId: 0,
  username: '',
  role: '',
  strategy: ''
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    // 로그인시 상태 값 저장
    login: (state, { payload }: PayloadAction<LoginTokenPayloadType>) => {
      state.userId = payload.userId;
      state.username = payload.username;
      state.role = payload.role;
      state.strategy = payload.strategy;
      saveUser(payload);
    },

    // 로그아웃시 상태 값 초기화
    logout: (state) => {
      state = initialState;
      removeUser();
    }
  }
});

export const { login, logout } = slice.actions;
export default slice.reducer;