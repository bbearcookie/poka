import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginToken } from "@type/user";
import { saveUserToStorage, removeUserFromStorage } from "./auth";

const name = 'auth';

const initialState = {
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
    login: (state, { payload }: PayloadAction<LoginToken>) => {
      state.userId = payload.userId;
      state.username = payload.username;
      state.role = payload.role;
      state.strategy = payload.strategy;
      saveUserToStorage(payload);
    },

    // 로그아웃시 상태 값 초기화
    logout: (state) => {
      state = initialState;
      removeUserFromStorage();
    }
  }
});

export const { login, logout } = slice.actions;
export default slice.reducer;