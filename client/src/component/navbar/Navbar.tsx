import React, { useState, useRef } from 'react';
import { usePopper } from 'react-popper';
import Button from '@component/form/Button';
import { useAppSelector, useAppDispatch } from '@app/reduxHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { changeShow } from '@component/sidebar/sidebarSlice';
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

  const userDropdown = useDropdown();
  const popper = usePopper(userDropdown.buttonElement, userDropdown.menuElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [-100, 0]
        }
      }
    ]
  });

  const onClickSidebarIcon = (e: React.MouseEvent) => {
    dispatch(changeShow(!show));
  }

  return (
    <article className="Navbar">
      <div className="sidebar-icon" onClick={onClickSidebarIcon}>
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
          <DropdownItem>ㅎㅎasdasdasdasdaaasdasdasd</DropdownItem>
          <DropdownItem>ㅎㅎ</DropdownItem>
          <DropdownItem>ㅎㅎ</DropdownItem>
          <DropdownItem>ㅎㅎ</DropdownItem>
        </DropdownMenu>}
      </Dropdown>

      {/* <Button rightIcon={faRightFromBracket} styles={{ theme:"gray-outlined" }}>로그아웃</Button> */}
    </article>
  );
}

Navbar.defaultProps = NavbarDefaultProps;
export default Navbar;