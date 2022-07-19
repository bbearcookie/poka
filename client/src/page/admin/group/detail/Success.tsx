import React, { useState, useCallback, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND } from '@util/commonAPI';
import { AxiosResponse } from 'axios';
import * as groupAPI from '@api/groupAPI';
import useModal from '@hook/useModal';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import Table from '@component/table/Table';
import TableHead from '@component/table/TableHead';
import TableHeadItem from '@component/table/TableHeadItem';
import TableBody from '@component/table/TableBody';
import ConfirmModal from '@component/modal/ConfirmModal';
import MemberEditor from './MemberEditor';
import MemberInfo from './MemberInfo';
import MemberAddButton from './MemberAddButton';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface SuccessProps {
  group: AxiosResponse<typeof groupAPI.getGroupDetail.resType>;
  groupId: number;
}

const SuccessDefaultProps = {};

function Success({ group, groupId }: SuccessProps & typeof SuccessDefaultProps) {
  const [editorTarget, setEditorTarget] = useState<number | boolean>(false); // 수정 모드일 경우 현재 수정중인 memberId를 나타낸다.
  const removeModal = useModal();

  // 편집 모드 ON / OFF
  const startEditor = useCallback((target: number | boolean) => setEditorTarget(target), []);
  const closeEditor = useCallback(() => setEditorTarget(false), []);

  // 그룹 삭제
  const removeGroup = useCallback(() => {
    console.log("그룹 삭제 요청하기");
  }, []);

  return (
    <>
      <section className="group-section">
        <img src={`${BACKEND}/image/group/${group?.data?.image_name}`} width="60" height="60" alt={group?.data?.name} />
        <h1 className="name-label">{group?.data?.name}</h1>
        <Link to={`/admin/group/editor/${groupId}`}>
          <Button theme="primary-outlined" padding="0.7em 1.3em" iconMargin="1em" rightIcon={faPenToSquare}>수정</Button>
        </Link>
      </section>
      
      <Card marginBottom="5em">
        <CardHeader><h1>그룹의 멤버</h1></CardHeader>
        <CardBody padding="0">
          <Table>
            <TableHead height="3em">
              <tr>
                <TableHeadItem width="50%" paddingLeft="1.5em">이름</TableHeadItem>
                <TableHeadItem width="20%">등록된 포토카드</TableHeadItem>
                <TableHeadItem width="30%" paddingRight="1.5em" textAlign="right">액션</TableHeadItem>
              </tr>
            </TableHead>
            <TableBody height="5em">
              <>
                {group?.data?.members.map((item, idx) => (
                  <Fragment key={idx}>
                    {editorTarget === idx && <MemberEditor groupId={groupId} memberId={item.member_id} defaultValue={item.name} closeEditor={closeEditor} />}
                    {editorTarget !== idx && <MemberInfo idx={idx} name={item.name} photoCnt={item.photo_cnt} startEditor={() => startEditor(idx)} />}
                  </Fragment>
                ))}

                {editorTarget === true && <MemberEditor groupId={groupId} closeEditor={closeEditor} />}
              </>
            </TableBody>
          </Table>
        </CardBody>

        {editorTarget !== true && <MemberAddButton startEditor={() => startEditor(true)} />}
      </Card>

      <Card>
        <CardHeader><h1>그룹 삭제</h1></CardHeader>
        <CardBody>
          <Button
            theme="danger-outlined"
            marginBottom="1em"
            padding="0.7em 1.3em"
            iconMargin="1em"
            leftIcon={faTrashCan}
            onClick={removeModal.open}
          >
            그룹 삭제
          </Button>
          <p className="description">해당 그룹을 삭제하면 연관된 멤버와 포토카드도 모두 지워지니 신중히 삭제해주세요.</p>
        </CardBody>
      </Card>

      <ConfirmModal
        hook={removeModal}
        maxWidth="100vh"
        location="CENTER_CENTER"
        titleName="그룹 삭제"
        confirmText="삭제"
        handleConfirm={removeGroup}
      >
        <p className="text">이 그룹을 삭제하면 연관된 멤버와 포토카드도 함께 지워져요.</p>
        <p className="text">정말로 {group.data?.name} 그룹을 삭제하시겠어요?</p>
      </ConfirmModal>
    </>
  );
}

Success.defaultProps = SuccessDefaultProps;

export default Success;