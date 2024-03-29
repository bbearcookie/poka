import React, { useCallback } from 'react';
import useGroupsQuery from '@api/query/group/useGroupsQuery';
import useGroupQuery from '@api/query/group/useGroupQuery';
import { Card, CardBody } from '@component/card/basic/_styles';
import Select from '@component/form/select/Select';
import { InputMessage } from '@component/form/_styles';
import { State, Action } from '../reducer';
import TitleLabel from '@component/label/TitleLabel';
import { InputSection } from './_styles';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function SelectCard({ state, dispatch }: Props) {
  const groupQuery = useGroupsQuery();
  const memberQuery = useGroupQuery(state.form.groupId);

  // 그룹 선택 변경
  const onChangeGroup = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch({ type: 'SET_GROUP_ID', groupId: Number(e.target.value) });
      dispatch({ type: 'SET_MEMBER_ID', memberId: 0 });
      dispatch({ type: 'SET_MESSAGE', payload: { target: 'groupId', value: '' } });
    },
    [dispatch]
  );

  // 멤버 선택 변경
  const onChangeMember = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch({ type: 'SET_MEMBER_ID', memberId: Number(e.target.value) });
      dispatch({ type: 'SET_MESSAGE', payload: { target: 'memberId', value: '' } });
    },
    [dispatch]
  );

  return (
    <Card className="SelectCard">
      <CardBody>
        <TitleLabel title="그룹 멤버 정보" css={{ marginBottom: '1em' }} />

        <InputSection>
          <section className="input-line">
            <span className="input-label">그룹</span>
            <Select
              onChange={onChangeGroup}
              css={{
                width: '100%',
                height: '2.5rem',
                marginLeft: '1em',
              }}
            >
              <option value={0}>선택</option>
              {groupQuery.data?.groups.map(item => (
                <option key={item.groupId} value={item.groupId}>
                  {item.name}
                </option>
              ))}
            </Select>
          </section>

          {state.message.groupId && (
            <InputMessage css={{ margin: '0.5em 0 0 0' }}>{state.message.groupId}</InputMessage>
          )}
        </InputSection>

        <InputSection>
          <section className="input-line">
            <span className="input-label">멤버</span>
            <Select
              onChange={onChangeMember}
              css={{
                width: '100%',
                height: '2.5rem',
                marginLeft: '1em',
              }}
            >
              <option value={0}>선택</option>
              {memberQuery.data?.members.map(item => (
                <option key={item.memberId} value={item.memberId}>
                  {item.name}
                </option>
              ))}
            </Select>
          </section>

          {state.message.memberId && (
            <InputMessage css={{ margin: '0.5em 0 0 0' }}>{state.message.memberId}</InputMessage>
          )}
        </InputSection>

        <p className="description">
          등록하려는 포토카드들이 어떤 대상의 포토카드인지를 지정합니다.
        </p>
      </CardBody>
    </Card>
  );
}

export default SelectCard;
