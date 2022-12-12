import React from 'react';
import useDropdown from '@hook/useDropdown';
import Dropdown from '@component/dropdown/Dropdown';
import DropdownButton from '@component/dropdown/DropdownButton';
import DropdownMenu from '@component/dropdown/DropdownMenu';
import DropdownItem from '@component/dropdown/DropdownItem';
import { usePopper } from 'react-popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { VoucherStateName, VoucherStateType } from './DataType';

interface Props {
  filter: VoucherStateType;
  changeFilter?: (voucherState: VoucherStateType) => void;
}
const DefaultProps = {
  changeFilter: () => {}
};

function StateFilter({ filter, changeFilter = DefaultProps.changeFilter }: Props) {
  const dropdown = useDropdown();
  const popper = usePopper(dropdown.buttonElement, dropdown.menuElement, {});

  return (
    <Dropdown hook={dropdown}>
      <DropdownButton
        styles={{ padding: "0.25em" }}
        buttonRef={dropdown.buttonRef}
        onClick={() => dropdown.toggle()}
      >
        <b>상태</b>
        <FontAwesomeIcon className="icon" icon={faChevronDown} />
      </DropdownButton>

      {dropdown.show &&
      <DropdownMenu popper={popper} menuRef={dropdown.menuRef} styles={{ minWidth: "10em", maxHeight: "20em" }}>
        {Object.entries(VoucherStateName).map((element) => (
        <DropdownItem key={element[0]} onClick={(e) => changeFilter(element[0] as VoucherStateType)}>
          <input type="radio" checked={filter === element[0]} readOnly/>
          <span>{element[1]}</span>
        </DropdownItem>))}
      </DropdownMenu>}
    </Dropdown>
  );
}

export default StateFilter;