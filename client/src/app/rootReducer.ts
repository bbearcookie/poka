import { combineReducers } from "@reduxjs/toolkit";
import sidebarSlice from "@component/sidebar/admin/sidebarSlice";

export default combineReducers({
  adminSidebar: sidebarSlice,
});