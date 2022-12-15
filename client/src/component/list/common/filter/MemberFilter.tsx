import React, { useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import useDropdown from '@hook/useDropdown';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import * as queryKey from '@util/queryKey';
import * as memberAPI from '@api/memberAPI';
import { usePopper } from 'react-popper';
import Dropdown from '@component/dropdown/Dropdown';
import DropdownButton from '@component/dropdown/DropdownButton';
import DropdownMenu from '@component/dropdown/DropdownMenu';
import DropdownItem from '@component/dropdown/DropdownItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { GroupType, MemberType } from './DataType';

interface Props {
  groupFilter: GroupType[];
  memberFilter: MemberType[];
  setMembers: (members: MemberType[]) => void;
  toggleMember: (memberId: number) => void;
  resetOnMount?: boolean;
}
const DefaultProps = {
  resetOnMount: false
};

function MemberFilter({
  groupFilter, memberFilter, setMembers, toggleMember,
  resetOnMount = DefaultProps.resetOnMount
}: Props) {
  const dropdown = useDropdown();
  const popper = usePopper(dropdown.buttonElement, dropdown.menuElement, {});

  const memberQuery =
  useQuery<typeof memberAPI.getAllMemberList.resType, AxiosError<ErrorType>>
  (queryKey.memberKeys.all, memberAPI.getAllMemberList.axios);

  // 멤버 정보 초기화
  const initMember = useCallback(() => {
    if (!memberQuery.data) return;

    let newMembers: MemberType[] = [];
    if (resetOnMount) {
      newMembers = memberQuery.data.members.map((member) => ({
        memberId: member.member_id,
        name: member.name,
        checked: false
      }));
    } else {
      newMembers = memberQuery.data.members.map((member) => ({
        memberId: member.member_id,
        name: member.name,
        checked: memberFilter.find(item => item.checked && item.memberId === member.member_id) ? true : false
      }));
    }

    setMembers(newMembers);
  }, [memberQuery.data, memberFilter, resetOnMount, setMembers]);
  useEffect(() => {
    initMember();
  }, [memberQuery.data]);

  return (
    <Dropdown hook={dropdown}>
      <DropdownButton
        styles={{ padding: "0.25em" }}
        buttonRef={dropdown.buttonRef}
        onClick={() => dropdown.toggle()}
      >
        <b>멤버</b>
        <FontAwesomeIcon className="icon" icon={faChevronDown} />
      </DropdownButton>

      {dropdown.show &&
      <DropdownMenu popper={popper} menuRef={dropdown.menuRef} styles={{ minWidth: "10em", maxHeight: "20em" }}>
        {!groupFilter.find(group => group.checked) && <DropdownItem>전체</DropdownItem>}

        {memberQuery.data?.members.map((member, idx) =>
        groupFilter.find(group => group.groupId === member.group_id && group.checked) && 
        (
          <DropdownItem
            key={member.member_id}
            onClick={(e) => toggleMember(member.member_id)}
          >
            <input 
              type="checkbox"
              checked={memberFilter[idx] && memberFilter[idx].checked ? memberFilter[idx].checked : false}
              readOnly
            />
            <span>{member.name}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>}
    </Dropdown>
  );
}

export default MemberFilter;