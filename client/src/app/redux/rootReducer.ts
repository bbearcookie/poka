import { combineReducers } from "@reduxjs/toolkit";
import sidebarSlice from "@component/sidebar/sidebarSlice";
import authSlice from "@util/auth/authSlice";
import voucherWriterSlice from "@page/admin/voucher/writer/voucherWriterSlice";
import voucherListSlice from "@component/list/voucher/voucherListSlice";
import photoListCardSlice from "@component/list/photo/photoListCardSlice";
import addressEditorSlice from "@page/user/profile/shipping/editor/addressEditorSlice";

export default combineReducers({
  sidebar: sidebarSlice,
  auth: authSlice,
  voucherWriter: voucherWriterSlice,
  voucherList: voucherListSlice,
  photoListCard: photoListCardSlice,
  addressEditor: addressEditorSlice
});