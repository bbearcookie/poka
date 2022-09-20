import React, { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@app/reduxHooks';
import { setUsername, setMessage } from '../voucherWriterSlice';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';

interface UsernameSectionProps {
  children?: React.ReactNode;
}
const UsernameSectionDefaultProps = {};

function UsernameSection({ children }: UsernameSectionProps & typeof UsernameSectionDefaultProps) {
  const { username } = useAppSelector((state) => state.voucherWriter);
  const dispatch = useAppDispatch();

  return (
    <Card marginBottom="2em">
      <CardHeader>
        <h3 className="title-label">사용자 아이디</h3>
      </CardHeader>
      <CardBody>
        <p className="description">소유권을 발급하려는 대상 사용자의 아이디를 지정합니다.</p>
        <Input
          type="text"
          name="username"
          value={username.value}
          onChange={(e) => dispatch(setUsername(e.target.value))}
          onBlur={(e) => dispatch(setMessage({ type: 'username', message: '' }))}
          placeholder="아이디를 입력하세요"
          autoComplete="off"
          styles={{
            width: "100%",
            height: "2.5em",
            margin: "1em 0 0.5em 0"
          }}
        >
          <InputMessage styles={{ margin: '1em 0 0 0' }}>{username.message}</InputMessage>
        </Input>
      </CardBody>
    </Card>
  );
}

UsernameSection.defaultProps = UsernameSectionDefaultProps;
export default UsernameSection;