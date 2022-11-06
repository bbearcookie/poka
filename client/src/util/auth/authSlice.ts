import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveUser, removeUser } from './auth';

const name = 'auth';

export interface User {
  user_id: number;
  username: string;
  nickname: string;
  role: string;
  strategy: string;
};

interface State extends User {}

const initialState: State = {
  user_id: 0,
  username: '',
  nickname: '',
  role: '',
  strategy: ''
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    // 로그인시 상태 값 저장
    login: (state, { payload }: PayloadAction<User>) => {
      state.user_id = payload.user_id;
      state.username = payload.username;
      state.nickname = payload.nickname;
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