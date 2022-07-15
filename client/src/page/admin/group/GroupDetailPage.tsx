import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as groupAPI from '@api/groupAPI';
import * as queryKey from '@util/queryKey';
import { ErrorType } from '@util/commonAPI';
import { AxiosError, AxiosResponse } from 'axios';
import { BACKEND } from '@util/commonAPI';
import WhiteCard, { WhiteCardBody, WhiteCardHeader } from '@component/card/WhiteCard';
import BackLabel from '@component/label/BackLabel';
import Button from '@component/form/basic/Button';
import Table from '@component/table/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faArrowRight, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './GroupDetailPage.scss';

interface GroupDetailPageProps {
  children?: React.ReactNode;
}

const GroupDetailPageDefaultProps = {};

function GroupDetailPage({ children }: GroupDetailPageProps & typeof GroupDetailPageDefaultProps) {
  const { groupId } = useParams() as any;
  const { status, data: group, error } =
  useQuery<AxiosResponse<typeof groupAPI.getGroupDetail.resType>, AxiosError<ErrorType>>
  (queryKey.groupKeys.detail(groupId), groupAPI.getGroupDetail.axios(groupId));

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
        <WhiteCardBody>
          <h3 className="card-label">멤버</h3>
        </WhiteCardBody>
        <Table>
          <thead>
            <tr>
              <th className="name">이름</th>
              <th className="photo">등록된 포토카드</th>
              <th className="action">액션</th>
            </tr>
          </thead>
          <tbody>
          {Array.from({length: 20}).map((_, idx) => (
          <tr key={idx}>
            <td>진</td>
            <td>5가지</td>
            <td>
              <section className="action-section">
                <div className="icon-button">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </div>
                <div className="icon-button">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </section>
            </td>
          </tr>
          ))}
          </tbody>
        </Table>
      </WhiteCard>

      <WhiteCard>
        <WhiteCardHeader>
          <h3 className="card-label">그룹 삭제</h3>
        </WhiteCardHeader>
        <WhiteCardBody>
          <Button theme="danger-outlined" padding="0.7em 1.3em" iconMargin="1em" leftIcon={faTrashCan}>그룹 삭제</Button>
          <p className="description">해당 그룹을 삭제하면 연관된 멤버와 포토카드도 모두 지워지니 신중히 삭제해주세요.</p>
        </WhiteCardBody>
      </WhiteCard>
    </div>
  );
}

GroupDetailPage.defaultProps = GroupDetailPageDefaultProps;

export default GroupDetailPage;