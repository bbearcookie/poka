import React, { useState, useCallback, useRef, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as memberAPI from '@api/memberAPI';
import * as groupAPI from '@api/groupAPI';
import * as queryKey from '@util/queryKey';
import { ErrorType } from '@util/commonAPI';
import { Axios, AxiosError, AxiosResponse } from 'axios';
import { BACKEND } from '@util/commonAPI';
import WhiteCard, { WhiteCardBody, WhiteCardHeader } from '@component/card/WhiteCard';
import BackLabel from '@component/label/BackLabel';
import Input from '@component/form/basic/Input';
import Button from '@component/form/basic/Button';
import Table from '@component/table/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faArrowRight, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import './GroupDetailPage.scss';

const TestData = [
  {
    member_id: 1,
    name: '진',
    photo_cnt: 3
  },
  {
    member_id: 2,
    name: 'V',
    photo_cnt: 5
  },
  {
    member_id: 3,
    name: '지민',
    photo_cnt: 2
  },
  {
    member_id: 4,
    name: '곰',
    photo_cnt: 7
  },
  {
    member_id: 5,
    name: '벨리',
    photo_cnt: 2
  },
];

interface GroupDetailPageProps {
  children?: React.ReactNode;
}

const GroupDetailPageDefaultProps = {};

function GroupDetailPage({ children }: GroupDetailPageProps & typeof GroupDetailPageDefaultProps) {
  const { groupId } = useParams() as any;
  const { status, data: group, error } =
  useQuery<AxiosResponse<typeof groupAPI.getGroupDetail.resType>, AxiosError<ErrorType>>
  (queryKey.groupKeys.detail(groupId), groupAPI.getGroupDetail.axios(groupId));
  const [editorTarget, setEditorTarget] = useState<number | boolean>(false);

  // 편집 모드 ON / OFF
  const startEditor = useCallback((target: number | boolean) => setEditorTarget(target), []);
  const closeEditor = useCallback(() => setEditorTarget(false), []);

  if (status === 'loading') {
    return (
      <div className="GroupDetailPage">
        <span>Loading...</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="GroupDetailPage">
        <span>Error: {error.response?.data.message}</span>
      </div>
    );
  }
  
  return (
    <div className="GroupDetailPage">
      <BackLabel to="/admin/group/list">그룹 목록</BackLabel>
      <section className="group-section">
        <img src={`${BACKEND}/image/group/${group?.data?.image_name}`} width="60" height="60" alt={group?.data?.name} />
        <h1 className="name-label">{group?.data?.name}</h1>
        <Button theme="primary-outlined" padding="0.7em 1.3em" iconMargin="1em" rightIcon={faPenToSquare}>수정</Button>
      </section>
      
      <WhiteCard>
        <WhiteCardBody><h2 className="card-label">그룹의 멤버</h2></WhiteCardBody>
        <Table>
          <thead>
            <tr>
              <th className="name">이름</th>
              <th className="photo">등록된 포토카드</th>
              <th className="action">액션</th>
            </tr>
          </thead>
          <tbody>
            {group?.data?.members.map((item, idx) => (
              <Fragment key={idx}>
                {editorTarget === idx && <MemberEditor groupId={groupId} memberId={item.member_id} defaultValue={item.name} closeEditor={closeEditor} />}
                {editorTarget !== idx &&
                <tr>
                  <td>{item.name}</td>
                  <td>{item.photo_cnt} 종류</td>
                  <td>
                    <section className="action-section">
                      <div className="icon-button" onClick={() => startEditor(idx)}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </div>
                      <div className="icon-button">
                        <FontAwesomeIcon icon={faArrowRight} />
                      </div>
                    </section>
                  </td>
                </tr>
                }
              </Fragment>
            ))}

            {editorTarget === true && <MemberEditor groupId={groupId} closeEditor={closeEditor} />}
          </tbody>
        </Table>

        {editorTarget !== true &&
        <section className="f-right">
          <Button
            className="add-button"
            theme="primary"
            padding="0.7em 1em"
            iconMargin="1em"
            leftIcon={faPlus}
            onClick={() => startEditor(true)}
          >추가</Button>
        </section>}
      </WhiteCard>

      <WhiteCard>
        <WhiteCardHeader><h3 className="card-label">그룹 삭제</h3></WhiteCardHeader>
        <WhiteCardBody>
          <Button className="remove-button" theme="danger-outlined" padding="0.7em 1.3em" iconMargin="1em" leftIcon={faTrashCan}>그룹 삭제</Button>
          <p className="description">해당 그룹을 삭제하면 연관된 멤버와 포토카드도 모두 지워지니 신중히 삭제해주세요.</p>
        </WhiteCardBody>
      </WhiteCard>
    </div>
  );
}

GroupDetailPage.defaultProps = GroupDetailPageDefaultProps;
export default GroupDetailPage;

// 테이블에 나타낼 멤버 편집 기능
interface MemberEditorProps {
  groupId: number;
  memberId?: number | undefined;
  defaultValue?: string;
  closeEditor: () => void;
}

const MemberEditorDefaultProps = {
  defaultValue: ''
};

function MemberEditor({ groupId, memberId, defaultValue, closeEditor }: MemberEditorProps & typeof MemberEditorDefaultProps) {
  const [name, setName] = useState(defaultValue);
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  // 데이터 추가 요청
  const addMutation = useMutation(memberAPI.postMember.axios, {
    onSuccess: (res: AxiosResponse<typeof memberAPI.postMember.resType>) => {
      toast.success('새로운 멤버를 추가했어요.', { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.groupKeys.detail(groupId));
      closeEditor();
    },
    onError: (err: AxiosError<ErrorType>) => {
      if (err.response?.data.message) {
        toast.error(err.response?.data.message, { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
        setMessage(err.response?.data.message);
      }
    }
  });

  // 데이터 수정 요청
  const modifyMutation = useMutation(memberAPI.putMember.axios, {
    onSuccess: (res: AxiosResponse<typeof memberAPI.putMember.resType>) => {
      toast.success(res.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.groupKeys.detail(groupId));
      closeEditor();
    },
    onError: (err: AxiosError<ErrorType>) => {
      if (err.response?.data.message) {
        toast.error(err.response?.data.message, { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
        setMessage(err.response?.data.message);
      }
    }
  });

  // input 상태 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value), []);

  // 전송 이벤트
  const onSubmit = useCallback(() => {
    if (memberId) modifyMutation.mutate({ memberId, name }); // 수정 요청
    else addMutation.mutate({ groupId, name }); // 추가 요청
  }, [name, groupId, memberId, addMutation, modifyMutation]);

  return (
    <tr className="member-editor">
      <td className="name">
        <Input
          type="text"
          name="name"
          value={name}
          onChange={changeInput}
          message={message}
          autoComplete="off"
          placeholder={memberId ? '추가할 이름을 입력하세요' : '수정할 이름을 입력하세요'}
        />
      </td>
      <td className="photo"></td>
      <td className="action">
        <section className="action-section">
          <Button theme="primary" padding="0.7em 1em" iconMargin="1em" onClick={onSubmit}>저장</Button>
          <Button theme="gray-outlined" padding="0.7em 1em" iconMargin="1em" onClick={closeEditor}>취소</Button>
        </section>
      </td>
    </tr>
  );
}

MemberEditor.defaultProps = MemberEditorDefaultProps;