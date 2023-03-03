import React, { useCallback } from 'react';
import useDropdown from '@hook/useDropdown';
import { usePopper } from 'react-popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '@component/dropdown/Dropdown';
import DropdownButton from '@component/dropdown/DropdownButton';
import DropdownMenu from '@component/dropdown/DropdownMenu';
import { StyledFilter } from './_styles';

interface Props {
  title?: string;
  children?: React.ReactNode;
}

function Filter({ title, children }: Props) {
  const dropdown = useDropdown();
  const popper = usePopper(dropdown.buttonElement, dropdown.menuElement, {});

  // 드롭다운 메뉴 열기 / 닫기
  const toggleDropdown = useCallback(() => {
    dropdown.toggle();
  }, [dropdown]);

  return (
    <StyledFilter>
      <Dropdown hook={dropdown}>
        <DropdownButton
          className="button"
          buttonRef={dropdown.buttonRef}
          onClick={toggleDropdown}
        >
          <b>{title}</b>
          <FontAwesomeIcon className="icon" icon={faChevronDown} />
        </DropdownButton>

        {dropdown.show &&
        <DropdownMenu
          className="menu"
          popper={popper}
          menuRef={dropdown.menuRef}
        >
          {children}
        </DropdownMenu>}
      </Dropdown>
    </StyledFilter>
  );
}

export default Filter;