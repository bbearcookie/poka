import React, { useState, useCallback } from 'react';
import UserInfo from './user/UserInfo';
import UserEditor from './user/UserEditor';
import './Index.scss';

interface IndexProps {
  children?: React.ReactNode;
}
const IndexDefaultProps = {};

function Index({ children }: IndexProps & typeof IndexDefaultProps) {
  const [editMode, setEditMode] = useState(false);
  
  // 편집 모드 ON / OFF
  const startEditor = useCallback(() => setEditMode(true), []);
  const closeEditor = useCallback(() => setEditMode(false), []);
  
  return (
    <div className="ProfilePage">
      <h1 className="title-label">마이페이지</h1>
      {editMode ?
      <UserEditor closeEditor={closeEditor} /> :
      <UserInfo startEditor={startEditor} />}
      
      
    </div>
  );
}

Index.defaultProps = IndexDefaultProps;
export default Index;