import { combineReducers } from "@reduxjs/toolkit";
import sidebarSlice from "@component/sidebar/sidebarSlice";
import photoSearchSlice from "@page/admin/photo/list/searchSlice";
import authSlice from "@util/auth/authSlice";

export default combineReducers({
  adminPhotoSearch: photoSearchSlice,
  sidebar: sidebarSlice,
  auth: authSlice
});