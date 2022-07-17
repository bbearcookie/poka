import React, { useState } from 'react';
import Button from '@component/form/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector, useAppDispatch } from '@app/reduxHooks';
import { changeShow } from '@component/sidebar/admin/sidebarSlice';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './Navbar.scss';

interface NavbarProps {
  children?: React.ReactNode;
}

const NavbarDefaultProps = {}

function Navbar({ children }: NavbarProps & typeof NavbarDefaultProps) {
  const show = useAppSelector((state) => state.adminSidebar.show);
  const dispatch = useAppDispatch();

  const onClickSidebarIcon = (e: React.MouseEvent) => {
    dispatch(changeShow(!show));
  }

  return (
    <article className="Navbar">
      <div className="sidebar-icon" onClick={onClickSidebarIcon}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="grow-section"></div>
      <Button theme="gray-outlined" rightIcon={faRightFromBracket}>로그아웃</Button>
    </article>
  );
}

Navbar.defaultProps = NavbarDefaultProps;

export default Navbar;