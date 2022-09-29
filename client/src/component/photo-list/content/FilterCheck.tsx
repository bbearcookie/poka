import React, { Fragment, useState, useCallback, useRef } from 'react';
import { usePopper } from 'react-popper';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { toggleLabel } from './searchSlice';
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

interface FilterCheckProps {
  children?: React.ReactNode;
}
const FilterCheckDefaultProps = {};

function FilterCheck({ children }: FilterCheckProps & typeof FilterCheckDefaultProps) {
  const { labels } = useAppSelector((state) => state.adminPhotoSearch);
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

  // 그룹 아이템 선택시
  const onClickGroupItem = useCallback((e: React.MouseEvent) => {
    const groupId = Number(e.currentTarget.getAttribute("data-data"));
    const name = groupQuery.data?.groups.find((item) => item.group_id === groupId)?.name;
    if (groupId) {
      dispatch(toggleLabel({
        text: name ? name : '',
        data: {
          type: 'GROUP_ID',
          value: groupId
        }
      }));
    }
  }, [dispatch, groupQuery]);

  // 멤버 아이템 선택시
  const onClickMemberItem = useCallback((e: React.MouseEvent) => {
    const memberId = Number(e.currentTarget.getAttribute("data-data"));
    const name = memberQuery.data?.members.find((item) => item.member_id === memberId)?.name;
    if (memberId) {
      dispatch(toggleLabel({
        text: name ? name : '',
        data: {
          type: 'MEMBER_ID',
          value: memberId
        }
      }));
    }
  }, [dispatch, memberQuery]);

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
          {groupQuery.data?.groups.map((group) => (
            <DropdownItem key={group.group_id} data={group.group_id} onClick={onClickGroupItem}>
              <input 
                type="checkbox" 
                value={group.group_id}
                checked={labels.find((item) => item.data.type === 'GROUP_ID' && item.data.value === group.group_id) ? true : false}
                onChange={() => {}}
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
          {memberQuery.data?.members.map((member) => labels.find((item) => item.data.type === 'GROUP_ID' && item.data.value === member.group_id) && (
            <DropdownItem key={member.member_id} data={member.member_id} onClick={onClickMemberItem}>
              <input 
                type="checkbox" 
                value={member.member_id}
                checked={labels.find((item) => item.data.type === 'MEMBER_ID' && item.data.value === member.member_id) ? true : false}
                onChange={() => {}}
              />
              <span>{member.name}</span>
            </DropdownItem>
          ))}

          {!labels.find((item) => item.data.type === 'GROUP_ID') && <DropdownItem>전체</DropdownItem>} 
        </DropdownMenu>}
      </Dropdown>

    </section>
  );
}

FilterCheck.defaultProps = FilterCheckDefaultProps;
export default FilterCheck;