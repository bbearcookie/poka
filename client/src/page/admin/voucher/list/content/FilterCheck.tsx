import React, { useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import { usePopper } from 'react-popper';
import { useAppSelector, useAppDispatch } from '@app/reduxHooks';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/commonAPI';
import * as queryKey from '@util/queryKey';
import * as groupAPI from '@api/groupAPI';
import * as memberAPI from '@api/memberAPI';
import useDropdown from '@hook/useDropdown';
import Dropdown from '@component/dropdown/Dropdown';
import DropdownButton from '@component/dropdown/DropdownButton';
import DropdownMenu from '@component/dropdown/DropdownMenu';
import DropdownItem from '@component/dropdown/DropdownItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { setGroups, setMembers, toggleGroup, toggleMember } from '../voucherListSlice';

interface FilterCheckProps {
  children?: React.ReactNode;
}
const FilterCheckDefaultProps = {};

function FilterCheck({ children }: FilterCheckProps & typeof FilterCheckDefaultProps) {
  const filter = useAppSelector((state) => state.voucherList.filter);
  const dispatch = useAppDispatch();
  const groupDropdown = useDropdown();
  const memberDropdown = useDropdown();
  const groupPopper = usePopper(groupDropdown.buttonElement, groupDropdown.menuElement, {});
  const memberPopper = usePopper(memberDropdown.buttonElement, memberDropdown.menuElement, {});

  const groupQuery =
  useQuery<typeof groupAPI.getAllGroupList.resType, AxiosError<ErrorType>>
  (queryKey.groupKeys.all, groupAPI.getAllGroupList.axios);

  const memberQuery =
  useQuery<typeof memberAPI.getAllMemberList.resType, AxiosError<ErrorType>>
  (queryKey.memberKeys.all, memberAPI.getAllMemberList.axios);

  // 그룹 정보 초기화
  useEffect(() => {
    if (!groupQuery.data) return;

    dispatch(setGroups(
      groupQuery.data.groups.map((group) => ({
        groupId: group.group_id,
        name: group.name
      }))
    ));
  }, [groupQuery.data]);

  // 멤버 정보 초기화
  useEffect(() => {
    if (!memberQuery.data) return;

    dispatch(setMembers(
      memberQuery.data.members.map((member) => ({
        memberId: member.member_id,
        name: member.name
      }))
    ));
  }, [memberQuery.data])

  return (
    <section className="check-section">

      {/* 그룹 선택 드롭다운 */}
      <Dropdown hook={groupDropdown}>
        <DropdownButton
          styles={{ padding: "0.25em" }}
          buttonRef={groupDropdown.buttonRef}
          onClick={() => groupDropdown.toggle()}
        >
          <b>그룹</b>
          <FontAwesomeIcon className="icon" icon={faChevronDown} />
        </DropdownButton>

        {groupDropdown.show &&
        <DropdownMenu popper={groupPopper} menuRef={groupDropdown.menuRef}>
          {groupQuery.data?.groups.map((group, idx) => (
            <DropdownItem
              key={group.group_id}
              onClick={(e) => dispatch(toggleGroup(group.group_id))}
            >
              <input
                type="checkbox"
                checked={filter.groups[idx].checked}
                readOnly
              />
              <span>{group.name}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>}
      </Dropdown>

      {/* 멤버 선택 드롭다운 */}
      <Dropdown hook={memberDropdown}>
        <DropdownButton
          styles={{ padding: "0.25em" }}
          buttonRef={memberDropdown.buttonRef}
          onClick={() => memberDropdown.toggle()}
        >
          <b>멤버</b>
          <FontAwesomeIcon className="icon" icon={faChevronDown} />
        </DropdownButton>

        {memberDropdown.show &&
        <DropdownMenu popper={memberPopper} menuRef={memberDropdown.menuRef}>
          {!filter.groups.find(group => group.checked) && <DropdownItem>전체</DropdownItem>}

          {memberQuery.data?.members.map((member, idx) =>
          filter.groups.find(group => group.groupId === member.group_id && group.checked) && 
          (
            <DropdownItem
              key={member.member_id}
              onClick={(e) => dispatch(toggleMember(member.member_id))}
            >
              <input 
                type="checkbox"
                checked={filter.members[idx].checked}
                readOnly
              />
              <span>{member.name}</span>
            </DropdownItem>
          ))}

        </DropdownMenu>}
      </Dropdown>
    </section>
  );
}

FilterCheck.defaultProps = FilterCheckDefaultProps;
export default FilterCheck;