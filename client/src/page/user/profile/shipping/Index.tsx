import React, { useState, useCallback, Fragment } from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import { useQuery } from 'react-query';
import * as userAPI from '@api/userAPI';
import * as queryKey from '@util/queryKey';
import { ErrorType } from '@util/commonAPI';
import { AxiosError, AxiosResponse } from 'axios';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import ErrorCard from '@component/card/ErrorCard';
import Address from './content/Address';
import AddButton from './content/AddButton';
import Editor from './content/editor/Index';
import Loading from './Loading';

interface IndexProps {
  children?: React.ReactNode;
}
const IndexDefaultProps = {};

function Index({ children }: IndexProps & typeof IndexDefaultProps) {
  const [editorTarget, setEditorTarget] = useState<number | boolean>(false); // 수정 모드일 경우 현재 수정중인 memberId를 나타낸다.
  const userId = useAppSelector(state => state.auth.user_id);

  const { status, data: addresses, error } =
  useQuery<typeof userAPI.getUserShippingAddress.resType, AxiosError<ErrorType>>
  (queryKey.userKeys.address(userId), () => userAPI.getUserShippingAddress.axios(userId));

  // 편집 모드 ON / OFF
  const startEditor = useCallback((target: number | boolean) => setEditorTarget(target), []);
  const closeEditor = useCallback(() => setEditorTarget(false), []);

  return (
    <section className="shipping-section">
      {status === 'success' && 
      <Card styles={{ marginBottom: "5em" }}>
        <CardHeader>
          <h1 className="subtitle-label">배송 정보</h1>
        </CardHeader>
        <CardBody styles={{ padding: "0" }}>
          {addresses?.addresses.map((address) => <Address key={address.id} address={address} />)}
          {editorTarget === true && <Editor closeEditor={closeEditor} />}
          {editorTarget !== true && <AddButton addressLength={addresses?.addresses.length ? addresses.addresses.length : 0} startEditor={() => startEditor(true)} />}
        </CardBody>
      </Card>}
      {status === 'loading' && <Loading />}
      {status === 'error' && <ErrorCard error={error} /> }
    </section>
  );
}

Index.defaultProps = IndexDefaultProps;
export default Index;