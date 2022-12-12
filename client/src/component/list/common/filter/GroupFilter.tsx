import React, { useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import useDropdown from '@hook/useDropdown';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import * as queryKey from '@util/queryKey';
import * as groupAPI from '@api/groupAPI';
import { usePopper } from 'react-popper';
import Dropdown from '@component/dropdown/Dropdown';
import DropdownButton from '@component/dropdown/DropdownButton';
import DropdownMenu from '@component/dropdown/DropdownMenu';
import DropdownItem from '@component/dropdown/DropdownItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { GroupType } from './DataType';

interface Props {
  filter: GroupType[];
  setGroups?: (groups: GroupType[]) => void;
  toggleGroup?: (groupId: number) => void;
}
const DefaultProps = {
  setGroups: () => {},
  toggleGroup: () => {}
};

function GroupFilter({
  filter,
  setGroups = DefaultProps.setGroups,
  toggleGroup = DefaultProps.toggleGroup
}: Props) {
  const dropdown = useDropdown();
  const popper = usePopper(dropdown.buttonElement, dropdown.menuElement, {});

  const groupQuery =
  useQuery<typeof groupAPI.getAllGroupList.resType, AxiosError<ErrorType>>
  (queryKey.groupKeys.all, groupAPI.getAllGroupList.axios);

  // 그룹 정보 초기화
  const initGroup = useCallback(() => {
    if (!groupQuery.data) return;

    let newGroups = groupQuery.data.groups.map((group) => ({
      groupId: group.group_id,
      name: group.name,
      checked: filter.find(item => item.groupId === group.group_id && item.checked) ? true : false
    }));

    setGroups(newGroups);
  }, [groupQuery.data, filter, setGroups]);
  useEffect(() => {
    initGroup();
  }, [groupQuery.data]);

  return (
    <>
      {/* 그룹 선택 드롭다운 */}
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
                checked={filter[idx].checked}
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