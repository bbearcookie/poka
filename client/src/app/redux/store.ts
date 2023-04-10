import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import newSidebarSlice from '@feature/sidebar/sidebarSlice';
import sidebarSlice from '@component/sidebar/sidebarSlice';
import authSlice from '@feature/auth/authSlice';

export const store = configureStore({
  reducer: combineReducers({
    newSidebar: newSidebarSlice,
    sidebar: sidebarSlice,
    auth: authSlice,
  }),
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;