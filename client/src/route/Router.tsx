import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@page/sign/login/LoginPage';
import SignupPage from '@page/sign/signup/SignupPage';
import PageTemplate from '@page/PageTemplate';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin/*" element={<PageTemplate pageType="ADMIN" />} />
        <Route path="*" element={<PageTemplate pageType="USER" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;