import React, { useCallback } from 'react';
import useUserQuery from '@api/query/user/useUserQuery';
import useLogout from '@api/mutation/auth/useLogout';
import { useNavigate, Link } from 'react-router-dom';
import { usePopper } from 'react-popper';
import { useAppSelector, useAppDispatch } from '@app/redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { changeShow } from '@component/sidebar/sidebarSlice';
import { userImage } from '@api/resource';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/button/Button';
import useDropdown from '@hook/useDropdown';
import Dropdown from '@component/dropdown/Dropdown';
import DropdownButton from '@component/dropdown/DropdownButton';
import DropdownMenu from '@component/dropdown/DropdownMenu';
import DropdownItem from '@component/dropdown/DropdownItem';
import './Navbar.scss';

function Navbar() {
  const show = useAppSelector(state => state.sidebar.show);
  const { userId } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userDropdown = useDropdown();
  const popper = usePopper(userDropdown.buttonElement, userDropdown.menuElement);

  const { status, data: user, error } = useUserQuery(userId);
  const logoutMutation = useLogout(res => {
    userDropdown.close();
    navigate('/login');
  });

  // 로그아웃 로직
  const handleLogout = useCallback(
    (e: React.MouseEvent) => {
      logoutMutation.mutate({});
    },
    [logoutMutation]
  );

  return (
    <nav className="Navbar">
      {status === 'success' ? (
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
                src={userImage(user?.imageName)}
                width="50"
                height="50"
                alt="사용자"
                onError={e => (e.currentTarget.src = '/user.png')}
              />
            </DropdownButton>

            {userDropdown.show && (
              <DropdownMenu popper={popper} menuRef={userDropdown.menuRef}>
                <DropdownItem>
                  <b>{user?.nickname}</b>
                </DropdownItem>
                <hr />
                <Link to="/profile">
                  <DropdownItem>마이페이지</DropdownItem>
                </Link>
                <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>
        </>
      ) : (
        <>
          <div className="space" />
          <Button
            rightIcon={faArrowRightToBracket}
            iconMargin='1em'
            buttonTheme="primary-outlined"
            onClick={() => navigate('/login')}
          >
            로그인
          </Button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
