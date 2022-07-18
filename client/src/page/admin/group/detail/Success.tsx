import React, { useState, useCallback, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND } from '@util/commonAPI';
import { AxiosResponse } from 'axios';
import * as groupAPI from '@api/groupAPI';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import Table from '@component/table/Table';
import ConfirmCard from '@component/card/ConfirmCard';
import MemberEditor from './MemberEditor';
import MemberInfo from './MemberInfo';
import MemberAddButton from './MemberAddButton';
import { faPenToSquare, faTrashCan, faClose } from '@fortawesome/free-solid-svg-icons';

interface SuccessProps {
  group: AxiosResponse<typeof groupAPI.getGroupDetail.resType>;
  groupId: number;
}

const SuccessDefaultProps = {};

function Success({ group, groupId }: SuccessProps & typeof SuccessDefaultProps) {
  const [editorTarget, setEditorTarget] = useState<number | boolean>(false); // 수정 모드일 경우 현재 수정중인 memberId를 나타낸다.
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  // 편집 모드 ON / OFF
  const startEditor = useCallback((target: number | boolean) => setEditorTarget(target), []);
  const closeEditor = useCallback(() => setEditorTarget(false), []);

  // 모달 ON / OFF
  const openRemoveModal = useCallback(() => setShowRemoveModal(true), []);
  const closeRemoveModal = useCallback(() => setShowRemoveModal(false), []);

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
            <thead>
              <tr>
                <th className="name">이름</th>
                <th className="photo">등록된 포토카드</th>
                <th className="action">액션</th>
              </tr>
            </thead>
            <tbody>
              <>
                {group?.data?.members.map((item, idx) => (
                  <Fragment key={idx}>
                    {editorTarget === idx && <MemberEditor groupId={groupId} memberId={item.member_id} defaultValue={item.name} closeEditor={closeEditor} />}
                    {editorTarget !== idx && <MemberInfo idx={idx} name={item.name} photoCnt={item.photo_cnt} startEditor={() => startEditor(idx)} />}
                  </Fragment>
                ))}

                {editorTarget === true && <MemberEditor groupId={groupId} closeEditor={closeEditor} />}
              </>
            </tbody>
          </Table>
        </CardBody>

        {editorTarget !== true && <MemberAddButton startEditor={() => startEditor(true)} />}
      </Card>

      <Card>
        <CardHeader><h1>그룹 삭제</h1></CardHeader>
        <CardBody>
          <Button
            className="remove-button"
            theme="danger-outlined"
            padding="0.7em 1.3em"
            iconMargin="1em"
            leftIcon={faTrashCan}
            onClick={openRemoveModal}
          >
            그룹 삭제
          </Button>
          <p className="description">해당 그룹을 삭제하면 연관된 멤버와 포토카드도 모두 지워지니 신중히 삭제해주세요.</p>
        </CardBody>
      </Card>

      {showRemoveModal &&
      <ConfirmCard title="그룹 삭제">
        <p>안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요</p>
        <p>hellohellohellohellohellohellohellohellohello</p>
        <p>안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요</p>
        <p>hellohellohellohellohellohellohellohellohello</p>
        <p>안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요</p>
        <p>hellohellohellohellohellohellohellohellohello</p>
        <p>안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요</p>
        <p>hellohellohellohellohellohellohellohellohello</p>
        <p>안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요</p>
        <p>hellohellohellohellohellohellohellohellohello</p>
        <p>안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요</p>
        <p>hellohellohellohellohellohellohellohellohello</p>
        <p>안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요</p>
        <p>hellohellohellohellohellohellohellohellohello</p>
        <p>안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요</p>
        <p>hellohellohellohellohellohellohellohellohello</p>
      </ConfirmCard>}
    </>
  );
}

Success.defaultProps = SuccessDefaultProps;

export default Success;