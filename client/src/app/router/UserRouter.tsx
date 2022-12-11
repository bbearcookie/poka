import React from "react";
import { getUser } from '@util/auth/auth';
import { useAppSelector } from "@app/redux/reduxHooks";
import { Route, Routes, Navigate } from "react-router-dom";
import PhotoSearchPage from "@page/user/photo/search/Index";
import ProfilePage from '@page/user/profile/Index';
import VoucherListPage from '@page/user/voucher/list/Index';
import VoucherDetailPage from '@page/user/voucher/detail/Index';
import TradeWriterPage from '@page/user/trade/writer/Index';

interface UserRouterProps {
  children?: React.ReactNode;
}
const UserRouterDefaultProps = {};

function UserRouter({ children }: UserRouterProps & typeof UserRouterDefaultProps) {
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
        <Route path="/trade/search" element={<PhotoSearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/voucher/list" element={<VoucherListPage />} />
        <Route path="/voucher/detail/:voucherId" element={<VoucherDetailPage />} />
        <Route path="/trade/writer" element={<TradeWriterPage />} />
      </Routes>
    </>
  );
}

UserRouter.defaultProps = UserRouterDefaultProps;
export default UserRouter;