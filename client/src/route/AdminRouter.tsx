import { getUserFromStorage } from '@feature/auth/authStorage';
import { Route, Routes, Navigate } from 'react-router-dom';
import { isAdmin } from '@util/user';
import GroupListPage from '@page/admin/group/list/Index';
import GroupWriterPage from '@page/admin/group/writer/WriterIndex';
import GroupEditorPage from '@page/admin/group/writer/EditorIndex';
import GroupDetailPage from '@page/admin/group/detail/Index';
import MemberDetailPage from '@page/admin/member/detail/Index';
import CropPage from '@page/admin/photo/crop/Index';
import PhotoWriterPage from '@page/admin/photo/writer/Index';
import PhotoListPage from '@page/admin/photo/list/Index';
import PhotoDetailPage from '@page/admin/photo/detail/Index';
import VoucherWriterPage from '@page/admin/voucher/writer/Index';
import VoucherListPage from '@page/admin/voucher/list/Index';
import VoucherDetailPage from '@page/admin/voucher/detail/Index';
import VoucherLogPage from '@page/admin/voucher/log/Index';
import ShippingListpage from '@page/admin/shipping/list/Index';
import ShippingDetailPage from '@page/admin/shipping/detail/Index';

// /admin 하위 라우팅 내용
function AdminRouter() {
  const user = getUserFromStorage();
  if (!user || !isAdmin(user.role)) return <Navigate to="/" />;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/voucher/list" />} />
      <Route path="/group/list" element={<GroupListPage />} />
      <Route path="/group/writer" element={<GroupWriterPage />} />
      <Route path="/group/editor/:groupId" element={<GroupEditorPage />} />
      <Route path="/group/detail/:groupId" element={<GroupDetailPage />} />
      <Route path="/member/detail/:memberId" element={<MemberDetailPage />} />
      <Route path="/photo/list" element={<PhotoListPage />} />
      <Route path="/photo/crop" element={<CropPage />} />
      <Route path="/photo/writer" element={<PhotoWriterPage />} />
      <Route path="/photo/detail/:photocardId" element={<PhotoDetailPage />} />
      <Route path="/voucher/writer" element={<VoucherWriterPage />} />
      <Route path="/voucher/list" element={<VoucherListPage />} />
      <Route path="/voucher/detail/:voucherId" element={<VoucherDetailPage />} />
      <Route path="/voucher/log/:voucherId" element={<VoucherLogPage />} />
      <Route path="/shipping/list" element={<ShippingListpage />} />
      <Route path="/shipping/detail/:requestId" element={<ShippingDetailPage />} />
    </Routes>
  );
}

export default AdminRouter;
