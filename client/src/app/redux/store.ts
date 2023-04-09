import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import sidebarSlice from '@component/sidebar/sidebarSlice';
import authSlice from '@feature/auth/authSlice';

export const store = configureStore({
  reducer: combineReducers({
    sidebar: sidebarSlice,
    auth: authSlice,
  }),
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;