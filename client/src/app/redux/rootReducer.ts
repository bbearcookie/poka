import { combineReducers } from "@reduxjs/toolkit";
import sidebarSlice from "@component/sidebar/sidebarSlice";
import authSlice from "@util/auth/authSlice";
import voucherListSlice from "@component/list/voucher/voucherListSlice";
import photoListCardSlice from "@component/list/photo/photoListCardSlice";

export default combineReducers({
  sidebar: sidebarSlice,
  auth: authSlice,
  voucherList: voucherListSlice,
  photoListCard: photoListCardSlice,
});