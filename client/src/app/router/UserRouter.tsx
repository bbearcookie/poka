import React from "react";
import { useAppSelector } from "@app/redux/reduxHooks";
import { Route, Routes } from "react-router-dom";
import PhotoSearchPage from "@page/user/photo/search/Index";
import ProfilePage from '@page/user/profile/Index';

interface UserRouterProps {
  children?: React.ReactNode;
}
const UserRouterDefaultProps = {};

function UserRouter({ children }: UserRouterProps & typeof UserRouterDefaultProps) {
  const { username, strategy, role, nickname } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route index element={
        <>
          <div>유저 페이지</div>
          <div>{username}</div>
          <div>{strategy}</div>
          <div>{role}</div>
          <div>{username}</div>
        </>
      } />
      <Route path="/trade/search" element={<PhotoSearchPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

UserRouter.defaultProps = UserRouterDefaultProps;
export default UserRouter;