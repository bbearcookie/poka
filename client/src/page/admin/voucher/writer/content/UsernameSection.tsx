import React, { useCallback } from 'react';
import { Card, CardHeader, CardBody } from '@component/card/basic/_styles';
import Input from '@component/form/input/Input';
import { InputMessage } from '@component/form/_styles';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function UsernameSection({ state, dispatch }: Props) {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_USERNAME', username: e.target.value });
    },
    [dispatch]
  );

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_MESSAGE', target: 'username', value: '' });
    },
    [dispatch]
  );

  return (
    <Card css={{ marginBottom: '2em' }}>
      <CardHeader>
        <h1 className="title">사용자 아이디</h1>
      </CardHeader>
      <CardBody>
        <Input
          type="text"
          name="username"
          value={state.form.username}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="아이디를 입력하세요"
          autoComplete="off"
          css={{
            width: '100%',
            height: '2.5em',
            margin: '0 0 0.5em 0',
          }}
        />
        {state.message.username && (
          <InputMessage css={{ margin: '1em 0 0 0' }}>{state.message.username}</InputMessage>
        )}
        <p className="description">소유권을 발급하려는 대상 사용자의 아이디를 지정합니다.</p>
      </CardBody>
    </Card>
  );
}

export default UsernameSection;
