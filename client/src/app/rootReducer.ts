import { combineReducers } from "@reduxjs/toolkit";
import sidebarSlice from "@component/sidebar/admin/sidebarSlice";
import photoSearchSlice from "@page/admin/photo/list/searchSlice";
import authSlice from "@util/auth/authSlice";

export default combineReducers({
  adminSidebar: sidebarSlice,
  adminPhotoSearch: photoSearchSlice,
  auth: authSlice
});