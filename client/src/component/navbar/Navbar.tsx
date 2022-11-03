import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopper } from 'react-popper';
import Button from '@component/form/Button';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { changeShow } from '@component/sidebar/sidebarSlice';
import { logout } from '@util/auth/authSlice';
import * as authAPI from '@api/authAPI';
import useDropdown from '@hook/useDropdown';
import Dropdown from '@component/dropdown/Dropdown';
import DropdownButton from '@component/dropdown/DropdownButton';
import DropdownMenu from '@component/dropdown/DropdownMenu';
import DropdownItem from '@component/dropdown/DropdownItem';
import './Navbar.scss';

interface NavbarProps {
  children?: React.ReactNode;
}
const NavbarDefaultProps = {}
function Navbar({ children }: NavbarProps & typeof NavbarDefaultProps) {
  const show = useAppSelector((state) => state.sidebar.show);
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userDropdown = useDropdown();
  const popper = usePopper(userDropdown.buttonElement, userDropdown.menuElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          // offset: [-30, 0]
        }
      }
    ]
  });

  // 로그아웃 로직
  const handleLogout = useCallback((e: React.MouseEvent) => {
    dispatch(logout());
    userDropdown.close();
    authAPI.postLogout.axios();
    return navigate('/login');
  }, [dispatch, navigate, userDropdown]);

  return (
    <article className="Navbar">
      <div className="sidebar-icon" onClick={() => dispatch(changeShow(!show))}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="grow-section"></div>

      <Dropdown hook={userDropdown}>
        <DropdownButton
          buttonRef={userDropdown.buttonRef}
          onClick={() => userDropdown.toggle()}
        >
          <img
            src="/user.png"
            width="50"
            height="50"
            alt="사용자"
          />
        </DropdownButton>

        {userDropdown.show &&
        <DropdownMenu popper={popper} menuRef={userDropdown.menuRef}>
          <DropdownItem><b>{user.nickname}</b></DropdownItem>
          <hr />
          <DropdownItem>마이페이지</DropdownItem>
          <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
        </DropdownMenu>}
      </Dropdown>

      {/* <Button rightIcon={faRightFromBracket} styles={{ theme:"gray-outlined" }}>로그아웃</Button> */}
    </article>
  );
}

Navbar.defaultProps = NavbarDefaultProps;
export default Navbar;