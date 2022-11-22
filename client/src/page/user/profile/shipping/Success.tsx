import React, { useState, useCallback, Fragment } from 'react';
import { useAppDispatch } from '@app/redux/reduxHooks';
import * as userAPI from '@api/userAPI';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Editor from './content/editor/Index';
import Address from './content/address/Address';
import AddButton from './content/AddButton';
import { initialize } from './content/editor/addressEditorSlice';

interface SuccessProps {
  addresses: typeof userAPI.getUserShippingAddress.resType;
  children?: React.ReactNode;
}
const SuccessDefaultProps = {};

function Success({ addresses, children }: SuccessProps & typeof SuccessDefaultProps) {
  const [editorTarget, setEditorTarget] = useState<number | boolean>(false); // 수정 모드일 경우 현재 수정중인 memberId를 나타낸다.
  const dispatch = useAppDispatch();

  // 편집 모드 ON / OFF
  const startEditor = useCallback((target: number | boolean) => {
    dispatch(initialize());
    setEditorTarget(target);
  }, [dispatch]);
  const closeEditor = useCallback(() => setEditorTarget(false), []);

  return (
    <Card styles={{ marginBottom: "5em" }}>
      <CardHeader>
        <h1 className="subtitle-label">배송 정보</h1>
      </CardHeader>
      <CardBody styles={{ padding: "0" }}>
          {addresses?.addresses.filter((address) => address.prime === "true").map((address) =>
          <Fragment key={address.address_id}>
            {editorTarget === address.address_id && <Editor address={address} closeEditor={closeEditor} />}
            {editorTarget !== address.address_id && <Address address={address} startEditor={() => startEditor(address.address_id)} />}
          </Fragment>)}
          {addresses?.addresses.filter((address) => address.prime === "false").map((address) =>
          <Fragment key={address.address_id}>
            {editorTarget === address.address_id && <Editor address={address} closeEditor={closeEditor} />}
            {editorTarget !== address.address_id && <Address address={address} startEditor={() => startEditor(address.address_id)} />}
          </Fragment>)}
        {editorTarget === true && <Editor closeEditor={closeEditor} />}
        {editorTarget !== true && <AddButton addressLength={addresses?.addresses.length ? addresses.addresses.length : 0} startEditor={() => startEditor(true)} />}
      </CardBody>
    </Card>
  );
}

Success.defaultProps = SuccessDefaultProps;
export default Success;