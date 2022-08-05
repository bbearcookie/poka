import React, { Fragment, useState, useCallback, useRef } from 'react';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useAppSelector, useAppDispatch } from '@app/reduxHooks';
import { setGroupId } from './searchSlice';
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
  const { groupIdList } = useAppSelector((state) => state.adminPhotoSearch);
  const dispatch = useAppDispatch();
  const dropdown = useDropdown();

  console.log(groupIdList);

  const groupQuery =
  useQuery<typeof groupAPI.getAllGroupList.resType, AxiosError<ErrorType>>
  (queryKey.groupKeys.all, groupAPI.getAllGroupList.axios);

  // 그룹 아이템 선택시
  const onClickGroupItem = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const groupId = e.currentTarget.getAttribute("data");
    if (groupId) dispatch(setGroupId(Number(groupId)));
  }, [dispatch]);

  return (
    <section className="check-section">

      <Dropdown hook={dropdown}>
        <DropdownButton hook={dropdown} styles={{ padding: "0.25em" }}>
          <b>그룹</b>
          <FontAwesomeIcon className="icon" icon={faChevronDown} />
        </DropdownButton>
        <DropdownMenu hook={dropdown} styles={{ width: '10em' }}>
          {groupQuery.data?.groups.map((item, idx) => (
            <DropdownItem key={item.group_id} data={item.group_id} onClick={onClickGroupItem}>
              <input 
                type="checkbox" 
                value={item.group_id} 
                checked={groupIdList.includes(item.group_id) ? true : false} 
                onChange={() => {}}
              />
              <span>{item.name}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

    </section>
  );
}

FilterCheck.defaultProps = FilterCheckDefaultProps;
export default FilterCheck;