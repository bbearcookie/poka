import React from 'react';
import { getUser } from '@util/auth/auth';
import { useAppSelector } from "@app/redux/reduxHooks";
import { Route, Routes, Navigate } from "react-router-dom";
import ProfilePage from '@page/user/profile/Index';
import VoucherListPage from '@page/user/voucher/list/Index';
import VoucherDetailPage from '@page/user/voucher/detail/Index';
import TradeWriterPage from '@page/user/trade/writer/WriterIndex';
import TradeEditorPage from '@page/user/trade/writer/EditorIndex';
import TradeListPage from '@page/user/trade/list/Index';
import TradeDetailPage from '@page/user/trade/detail/Index';
import TradeHistoryPage from '@page/user/trade/history/Index';

function UserRouter() {
  const { username, strategy, role } = useAppSelector((state) => state.auth);
  const user = getUser();

  return (
    <>
      {!user?.username && <Navigate to="/login" />}
      <Routes>
        <Route index element={
          <>
            <div>유저 페이지</div>
            <div>{username}</div>
            <div>{strategy}</div>
            <div>{role}</div>
          </>
        } />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/voucher/list" element={<VoucherListPage />} />
        <Route path="/voucher/detail/:voucherId" element={<VoucherDetailPage />} />
        <Route path="/trade/writer" element={<TradeWriterPage />} />
        <Route path="/trade/editor/:tradeId" element={<TradeEditorPage />} />
        <Route path="/trade/list" element={<TradeListPage />} />
        <Route path="/trade/detail/:tradeId" element={<TradeDetailPage />} />
        <Route path="/trade/history" element={<TradeHistoryPage />} />
      </Routes>
    </>
  );
}

export default UserRouter;