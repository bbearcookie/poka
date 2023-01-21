import React, { useCallback } from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function UsernameSection({ state, dispatch }: Props) {

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_USERNAME', username: e.target.value });
  }, [dispatch]);

  const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_MESSAGE', target: 'username', value: '' });
  }, [dispatch]);

  return (
    <Card styles={{ marginBottom: "2em" }}>
      <CardHeader>
        <h3 className="label">사용자 아이디</h3>
      </CardHeader>
      <CardBody>
        <p className="description">소유권을 발급하려는 대상 사용자의 아이디를 지정합니다.</p>
        <Input
          type="text"
          name="username"
          value={state.form.username}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="아이디를 입력하세요"
          autoComplete="off"
          styles={{
            width: "100%",
            height: "2.5em",
            margin: "1em 0 0.5em 0"
          }}
        >
          {state.message.username && <InputMessage styles={{ margin: '1em 0 0 0' }}>{state.message.username}</InputMessage>}
        </Input>
      </CardBody>
    </Card>
  );
}

export default UsernameSection;