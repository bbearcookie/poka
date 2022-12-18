import { combineReducers } from "@reduxjs/toolkit";
import sidebarSlice from "@component/sidebar/sidebarSlice";
import authSlice from "@util/auth/authSlice";
import voucherListSlice from "@component/list/voucher/voucherListSlice";
import photoListCardSlice from "@component/list/photo/photoListCardSlice";
import addressEditorSlice from "@page/user/profile/shipping/content/editor/addressEditorSlice";

export default combineReducers({
  sidebar: sidebarSlice,
  auth: authSlice,
  voucherList: voucherListSlice,
  photoListCard: photoListCardSlice,
  addressEditor: addressEditorSlice
});