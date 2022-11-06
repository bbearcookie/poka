import React from "react";
import { getUser } from '@util/auth/auth';
import { useAppSelector } from "@app/redux/reduxHooks";
import { Route, Routes, Navigate } from "react-router-dom";
import PhotoSearchPage from "@page/user/photo/search/Index";
import ProfilePage from '@page/user/profile/Index';

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
      </Routes>
    </>
  );
}

UserRouter.defaultProps = UserRouterDefaultProps;
export default UserRouter;