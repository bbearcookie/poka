import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "@page/admin/AdminPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;