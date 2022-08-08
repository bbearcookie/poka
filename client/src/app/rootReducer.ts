import { combineReducers } from "@reduxjs/toolkit";
import sidebarSlice from "@component/sidebar/admin/sidebarSlice";
import photoSearchSlice from "@page/admin/photo/list/searchSlice";

export default combineReducers({
  adminSidebar: sidebarSlice,
  adminPhotoSearch: photoSearchSlice
});