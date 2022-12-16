import React, { useEffect, useCallback } from 'react';
import useDropdown from '@hook/useDropdown';
import { usePopper } from 'react-popper';
import Dropdown from '@component/dropdown/Dropdown';
import DropdownButton from '@component/dropdown/DropdownButton';
import DropdownMenu from '@component/dropdown/DropdownMenu';
import DropdownItem from '@component/dropdown/DropdownItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { GroupType } from './DataType';
import useGroupsQuery from '@api/query/group/useGroupsQuery';

interface Props {
  filter: GroupType[];
  setGroups: (groups: GroupType[]) => void;
  toggleGroup: (groupId: number) => void;
  resetOnMount?: boolean;
}
const DefaultProps = {
  resetOnMount: false
};

function GroupFilter({ filter, setGroups, toggleGroup, resetOnMount = DefaultProps.resetOnMount }: Props) {
  const dropdown = useDropdown();
  const popper = usePopper(dropdown.buttonElement, dropdown.menuElement, {});
  const groupQuery = useGroupsQuery();

  // 그룹 정보 초기화
  const initGroup = useCallback(() => {
    if (!groupQuery.data) return;

    let newGroups: GroupType[] = [];
    if (resetOnMount) {
      newGroups = groupQuery.data.groups.map((group) => ({
        groupId: group.group_id,
        name: group.name,
        checked: false
      }));
    } else {
      newGroups = groupQuery.data.groups.map((group) => ({
        groupId: group.group_id,
        name: group.name,
        checked: filter.find(item => item.checked && item.groupId === group.group_id) ? true : false
      }));
    }

    setGroups(newGroups);
  }, [groupQuery.data, setGroups, filter, resetOnMount]);
  useEffect(() => {
    initGroup();
  }, [groupQuery.data]);

  return (
    <>
      <Dropdown hook={dropdown}>
        <DropdownButton
          styles={{ padding: "0.25em" }}
          buttonRef={dropdown.buttonRef}
          onClick={() => dropdown.toggle()}
        >
          <b>그룹</b>
          <FontAwesomeIcon className="icon" icon={faChevronDown} />
        </DropdownButton>

        {dropdown.show &&
        <DropdownMenu popper={popper} menuRef={dropdown.menuRef} styles={{ minWidth: "10em", maxHeight: "20em" }}>
          {groupQuery.data?.groups.map((group, idx) => (
            <DropdownItem
              key={group.group_id}
              onClick={(e) => toggleGroup(group.group_id)}
            >
              <input
                type="checkbox"
                checked={filter[idx] && filter[idx].checked ? filter[idx].checked : false}
                readOnly
              />
              <span>{group.name}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>}
      </Dropdown>
    </>
  );
}

export default GroupFilter;