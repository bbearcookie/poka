import { combineReducers } from "@reduxjs/toolkit";
import sidebarSlice from "@component/sidebar/sidebarSlice";
import authSlice from "@util/auth/authSlice";

export default combineReducers({
  sidebar: sidebarSlice,
  auth: authSlice,
});