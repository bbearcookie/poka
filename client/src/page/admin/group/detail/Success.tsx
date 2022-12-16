import React from 'react';
import { Link } from 'react-router-dom';
import { groupImage } from '@api/resource';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ResType as GroupType } from '@api/query/group/useGroupQuery';
import Button from '@component/form/Button';
import MemberList from './content/MemberList';
import GroupRemove from './content/GroupRemove';

interface Props {
  group: GroupType;
  groupId: number;
}
const DefaultProps = {};

function Success({ group, groupId }: Props) {
  return (
    <>
      <section className="group-section">
        <img src={groupImage(group?.image_name)} width="60" height="60" alt={group?.name} />
        <h1 className="name-label">{group?.name}</h1>
        <Link className="link-section" to={`/admin/group/editor/${groupId}`}>
          <Button
            rightIcon={faPenToSquare}
            styles={{
              theme: "primary-outlined",
              padding: "0.7em 1.3em",
              iconMargin: "1em"
            }}
          >수정</Button>
        </Link>
      </section>

      <MemberList group={group} groupId={groupId} />
      <GroupRemove group={group} groupId={groupId} />
    </>
  );
}

export default Success;