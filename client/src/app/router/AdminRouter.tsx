import React from "react";
import { Route, Routes } from "react-router-dom";
import FirstPage from "@page/admin/first/FirstPage";
import SecondPage from "@page/admin/second/SecondPage";
import GroupListPage from "@page/admin/group/GroupListPage";
import GroupWriterPage from "@page/admin/group/GroupWriterPage";
import GroupDetailPage from "@page/admin/group/GroupDetailPage";

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
      <Route path="/first" element={<FirstPage />} />
      <Route path="/second" element={<SecondPage />} />
      <Route path="/group/list" element={<GroupListPage />} />
      <Route path="/group/writer" element={<GroupWriterPage />} />
      <Route path="/group/detail/:groupId" element={<GroupDetailPage />} />
    </Routes>
  );
}

export default AdminRouter;