import React from 'react';
import Button from '@component/form/Button';
import { useAppSelector, useAppDispatch } from '@app/reduxHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { changeShow } from '@component/sidebar/sidebarSlice';
import './Navbar.scss';

interface NavbarProps {
  children?: React.ReactNode;
}
const NavbarDefaultProps = {}
function Navbar({ children }: NavbarProps & typeof NavbarDefaultProps) {
  const show = useAppSelector((state) => state.sidebar.show);
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
      <Button rightIcon={faRightFromBracket} styles={{ theme:"gray-outlined" }}>로그아웃</Button>
    </article>
  );
}

Navbar.defaultProps = NavbarDefaultProps;
export default Navbar;