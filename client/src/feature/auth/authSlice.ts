import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginToken } from "@type/user";
import { getUserFromStorage, saveUserToStorage, removeUserFromStorage } from "./authStorage";

const name = 'auth';

const initialState = {
  userId: 0,
  username: '',
  role: '',
  strategy: ''
}

export const slice = createSlice({
  name,
  initialState: getUserFromStorage() || initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<LoginToken>) => {
      state.userId = payload.userId;
      state.username = payload.username;
      state.role = payload.role;
      state.strategy = payload.strategy;
      saveUserToStorage(payload);
    },

    logout: (state) => {
      state = initialState;
      removeUserFromStorage();
    }
  }
});

export const { login, logout } = slice.actions;

export default slice.reducer;