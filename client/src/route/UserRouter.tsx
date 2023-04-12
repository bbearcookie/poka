import { getUserFromStorage } from '@feature/auth/authStorage';
import { Route, Routes, Navigate } from 'react-router-dom';
import MyInfoPage from '@page/user/myinfo/Index';
import VoucherListPage from '@page/user/voucher/list/Index';
import VoucherDetailPage from '@page/user/voucher/detail/Index';
import TradeWriterPage from '@page/user/trade/writer/Index';
import TradeEditorPage from '@page/user/trade/editor/Index';
import TradeMinePage from '@page/user/trade/mine/Index';
import TradeSearchPage from '@page/user/trade/search/Index';
import TradeDetailPage from '@page/user/trade/detail/Index';
import TradeHistoryPage from '@page/user/trade/history/Index';
import ShippingWriterPage from '@page/user/shipping/writer/Index';
import ShippingDetailPage from '@page/user/shipping/detail/Index';
import ShippingListPage from '@page/user/shipping/list/Index';

function UserRouter() {
  const user = getUserFromStorage();
  if (!user || !user.username) return <Navigate to="/login" />;

  return (
    <Routes>
      <Route path="/myinfo" element={<MyInfoPage />} />
      <Route path="/voucher/list" element={<VoucherListPage />} />
      <Route path="/voucher/detail/:voucherId" element={<VoucherDetailPage />} />
      <Route path="/trade/writer" element={<TradeWriterPage />} />
      <Route path="/trade/editor/:tradeId" element={<TradeEditorPage />} />
      <Route path="/trade/mine" element={<TradeMinePage />} />
      <Route path="/trade/search" element={<TradeSearchPage />} />
      <Route path="/trade/detail/:tradeId" element={<TradeDetailPage />} />
      <Route path="/trade/history" element={<TradeHistoryPage />} />
      <Route path="/shipping/list" element={<ShippingListPage />} />
      <Route path="/shipping/writer" element={<ShippingWriterPage />} />
      <Route path="/shipping/detail/:requestId" element={<ShippingDetailPage />} />
    </Routes>
  );
}

export default UserRouter;
