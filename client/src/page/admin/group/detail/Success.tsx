import React from 'react';
import { Link } from 'react-router-dom';
import { BACKEND } from '@util/commonAPI';
import { AxiosResponse } from 'axios';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import * as groupAPI from '@api/groupAPI';
import Button from '@component/form/Button';
import MemberList from './MemberList';
import GroupRemove from './GroupRemove';

interface SuccessProps {
  group: AxiosResponse<typeof groupAPI.getGroupDetail.resType>;
  groupId: number;
}

const SuccessDefaultProps = {};

function Success({ group, groupId }: SuccessProps & typeof SuccessDefaultProps) {
  return (
    <>
      <section className="group-section">
        <img src={`${BACKEND}/image/group/${group?.data?.image_name}`} width="60" height="60" alt={group?.data?.name} />
        <h1 className="name-label">{group?.data?.name}</h1>
        <Link className="link-section" to={`/admin/group/editor/${groupId}`}>
          <Button theme="primary-outlined" padding="0.7em 1.3em" iconMargin="1em" rightIcon={faPenToSquare}>수정</Button>
        </Link>
      </section>

      <MemberList group={group} groupId={groupId} />
      <GroupRemove group={group} groupId={groupId} />
    </>
  );
}

Success.defaultProps = SuccessDefaultProps;
export default Success;