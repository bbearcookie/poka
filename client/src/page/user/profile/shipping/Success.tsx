import React, { useState, useCallback, Fragment } from 'react';
import { ResType as AddressesResType } from '@api/query/shipping/useShippingAddressesQuery';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Editor from './content/editor/Index';
import AddButton from './content/AddButton';
import Address from './content/address/Index';

interface Props {
  addresses: AddressesResType;
}

function Success({ addresses }: Props) {
  const [editorTarget, setEditorTarget] = useState<number | boolean>(false); // 수정 모드일 경우 현재 수정중인 memberId를 나타낸다.

  // 편집 모드 ON / OFF
  const startEditor = useCallback((target: number | boolean) => {
    setEditorTarget(target);
  }, []);
  const closeEditor = useCallback(() => setEditorTarget(false), []);

  return (
    <Card styles={{ marginBottom: "5em" }}>
      <CardHeader>
        <h1 className="title">배송 정보</h1>
      </CardHeader>
      <CardBody styles={{ padding: "0" }}>
        {addresses.addresses.map((address) => 
        <Fragment key={address.addressId}>
          {editorTarget === address.addressId && <Editor address={address} closeEditor={closeEditor} />}
          {editorTarget !== address.addressId && <Address address={address} startEditor={() => startEditor(address.addressId)} />}
        </Fragment>)}
        {editorTarget === true && <Editor closeEditor={closeEditor} />}
        {editorTarget !== true && <AddButton addressLength={addresses?.addresses.length ? addresses.addresses.length : 0} startEditor={() => startEditor(true)} />}
      </CardBody>
    </Card>
  );
}

export default Success;