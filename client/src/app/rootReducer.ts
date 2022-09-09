import { combineReducers } from "@reduxjs/toolkit";
import sidebarSlice from "@component/sidebar/sidebarSlice";
import photoSearchSlice from "@component/photo-list/content/searchSlice";
import authSlice from "@util/auth/authSlice";

export default combineReducers({
  adminPhotoSearch: photoSearchSlice,
  sidebar: sidebarSlice,
  auth: authSlice
});