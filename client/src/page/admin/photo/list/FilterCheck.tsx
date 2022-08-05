import React, { Fragment, useState, useCallback } from 'react';
import { useQuery } from 'react-query';
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

interface FilterCheckProps {
  children?: React.ReactNode;
}
const FilterCheckDefaultProps = {};

function FilterCheck({ children }: FilterCheckProps & typeof FilterCheckDefaultProps) {
  const dropdown = useDropdown();

  const groupQuery =
  useQuery<typeof groupAPI.getAllGroupList.resType, AxiosError<ErrorType>>
  (queryKey.groupKeys.all, groupAPI.getAllGroupList.axios);

  return (
    <section className="check-section">

      <Dropdown hook={dropdown}>
        <DropdownButton hook={dropdown} styles={{ padding: "0.25em" }}>
          <b>그룹</b> <FontAwesomeIcon className="icon" icon={faChevronDown} />
        </DropdownButton>
        <DropdownMenu hook={dropdown} styles={{ width: '10em' }}>
          {groupQuery.data?.groups.map((item, idx) => (
            <DropdownItem key={item.group_id}>
              <input id={`${item.group_id}`} type="checkbox" value={item.group_id} />
              <label htmlFor={`${item.group_id}`}>{item.name}</label>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

    </section>
  );
}

FilterCheck.defaultProps = FilterCheckDefaultProps;
export default FilterCheck;