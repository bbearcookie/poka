import React from "react";
import { Route, Routes } from "react-router-dom";
import FirstPage from "@page/admin/first/FirstPage";
import SecondPage from "@page/admin/second/SecondPage";

// /admin 하위 라우팅 내용
function AdminRouter() {
  return (
    <Routes>
      <Route index element={
        <>
          <div>ㅎㅇ</div>
          <div>ㅎㅇ</div>
          {Array.from({length: 150}).map((_, idx) => (<div key={idx}>길이가 무지막지길다면</div>))}
        </>
      } />
      <Route path="/first" element={<FirstPage />}/>
      <Route path="/second" element={<SecondPage />}/>
    </Routes>
  );
}

export default AdminRouter;