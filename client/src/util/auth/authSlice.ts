import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveUser, removeUser } from './auth';

const name = 'auth';

export interface User {
  username: string;
  role: string;
  strategy: string;
};

interface State extends User {}

const initialState: State = {
  username: '',
  role: '',
  strategy: ''
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    // 로그인시 상태 값 저장
    login: (state, { payload }: PayloadAction<User>) => {
      state.username = payload.username;
      state.role = payload.role;
      state.strategy = payload.strategy;
      saveUser(payload);
    },

    // 로그아웃시 상태 값 초기화
    logout: (state) => {
      state.username = '';
      state.role = '';
      state.strategy = '';
      removeUser();
    }
  }
});

export const { login, logout } = slice.actions;
export default slice.reducer;