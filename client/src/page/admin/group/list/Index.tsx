import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Button from '@component/form/Button';
import Table from '@component/table/Table';
import TableHead from '@component/table/TableHead';
import TableBody from '@component/table/TableBody';
import TableHeadItem from '@component/table/TableHeadItem';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType, getErrorMessage, BACKEND } from '@util/commonAPI';
import * as queryKey from '@util/queryKey';
import * as groupAPI from '@api/groupAPI';
import GroupList from './GroupList';
import SkeletonGroupList from './SkeletonGroupList';
import './Index.scss';

interface GroupListPageProps {
  children?: React.ReactNode;
}

const GroupListPageDefaultProps = {};

function GroupListPage({ children }: GroupListPageProps & typeof GroupListPageDefaultProps) {
  const { status, data: groups, error } = 
  useQuery<AxiosResponse<typeof groupAPI.getAllGroupList.resType>, AxiosError<ErrorType>>
  (queryKey.groupKeys.all, groupAPI.getAllGroupList.axios);

  return (
    <section className="GroupListPage">
      <div className="title-label-section">
        <h1 className="title-label">그룹 목록</h1>
        <Link to="/admin/group/writer">
          <Button theme="primary" padding="0.7em 1.3em" iconMargin="1em" leftIcon={faPlus}>추가</Button>
        </Link>
      </div>

      <Table>
        <TableHead height="3rem">
          <tr>
            <TableHeadItem width="60%" paddingLeft="1.5em">이름</TableHeadItem>
            <TableHeadItem width="30%">멤버</TableHeadItem>
            <TableHeadItem width="10%" paddingRight="1.5em" textAlign="right">액션</TableHeadItem>
          </tr>
        </TableHead>
        <TableBody height="5rem">
          {status === 'loading' && <SkeletonGroupList />}
          {status === 'success' && <GroupList groups={groups} />}
          {status === 'error' && <tr><td>{getErrorMessage(error)}</td><td/><td/></tr>}
        </TableBody>
      </Table>

    </section>
  );
}

GroupListPage.defaultProps = GroupListPageDefaultProps;

export default GroupListPage;