import React, { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, Link } from 'react-router-dom';
import { usePopper } from 'react-popper';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { changeShow } from '@component/sidebar/sidebarSlice';
import { logout } from '@util/auth/authSlice';
import { userImage } from '@api/resource';
import { ErrorType } from '@util/request';
import { AxiosError, AxiosResponse } from 'axios';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';
import * as authAPI from '@api/authAPI';
import * as userAPI from '@api/userAPI';
import * as queryKey from '@util/queryKey';
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
  const { user_id } = useAppSelector((state) => state.auth);
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

  const { status, data: user, error } =
  useQuery<typeof userAPI.getUserDetail.resType, AxiosError<ErrorType>>
  (queryKey.userKeys.profile(user_id), () => userAPI.getUserDetail.axios(user_id));

  // 로그아웃 로직
  const handleLogout = useCallback((e: React.MouseEvent) => {
    dispatch(logout());
    userDropdown.close();
    authAPI.postLogout.axios();
    return navigate('/login');
  }, [dispatch, navigate, userDropdown]);

  return (
    <article className="Navbar">
      
      {status === 'success' ?
      <>
        <div className="sidebar-icon" onClick={() => dispatch(changeShow(!show))}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="space" />

        <Dropdown hook={userDropdown}>
          <DropdownButton
            buttonRef={userDropdown.buttonRef}
            onClick={() => userDropdown.toggle()}
          >
            <img
              className="profile-img"
              src={userImage(user?.image_name)}
              width="50"
              height="50"
              alt="사용자"
              onError={e => e.currentTarget.src = "/user.png"}
            />
          </DropdownButton>

          {userDropdown.show &&
          <DropdownMenu popper={popper} menuRef={userDropdown.menuRef}>
            <DropdownItem><b>{user?.nickname}</b></DropdownItem>
            <hr />
            <Link to="/profile"><DropdownItem>마이페이지</DropdownItem></Link>
            <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
          </DropdownMenu>}
        </Dropdown>
      </> :
      <>
        <div className="space" />
        <Button
          rightIcon={faArrowRightToBracket}
          styles={{
            theme: 'primary-outlined'
          }}
          onClick={() => navigate('/login')}
        >로그인</Button>
      </>}
    </article>
  );
}

Navbar.defaultProps = NavbarDefaultProps;
export default Navbar;