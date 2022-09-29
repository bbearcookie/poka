import { combineReducers } from "@reduxjs/toolkit";
import sidebarSlice from "@component/sidebar/sidebarSlice";
import authSlice from "@util/auth/authSlice";
import voucherWriterSlice from "@page/admin/voucher/writer/voucherWriterSlice";
import voucherListSlice from "@page/admin/voucher/list/voucherListSlice";
import photoListCardSlice from "@component/photo-list/photoListCardSlice";

export default combineReducers({
  sidebar: sidebarSlice,
  auth: authSlice,
  voucherWriter: voucherWriterSlice,
  voucherList: voucherListSlice,
  photoListCard: photoListCardSlice
});