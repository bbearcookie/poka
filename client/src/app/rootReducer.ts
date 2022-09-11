import { combineReducers } from "@reduxjs/toolkit";
import sidebarSlice from "@component/sidebar/sidebarSlice";
import photoSearchSlice from "@component/photo-list/content/searchSlice";
import authSlice from "@util/auth/authSlice";
import voucherWriterSlice from "@page/admin/voucher/writer/voucherWriterSlice";

export default combineReducers({
  adminPhotoSearch: photoSearchSlice,
  sidebar: sidebarSlice,
  auth: authSlice,
  voucherWriter: voucherWriterSlice
});