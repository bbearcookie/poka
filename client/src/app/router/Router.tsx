import React, { useEffect } from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AdminPage from '@page/admin/AdminPage';
import UserPage from '@page/user/UserPage';
import LoginPage from '@page/sign/login/LoginPage';
import SignupPage from '@page/sign/signup/SignupPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;