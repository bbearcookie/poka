import { useState, useCallback, Fragment } from 'react';
import { ResType } from '@api/query/shipping/useShippingAddressesQuery';
import { Card, CardHeader } from '@component/card/new/Card';
import AddressInfo from './content/AddressInfo';
import TitleLabel from '@component/label/titleLabel/TitleLabel';

interface Props {
  res: ResType;
}

function Sucecss({ res }: Props) {
  const [editorTarget, setEditorTarget] = useState<number | boolean>(false);

  // 편집 모드 ON / OFF
  const startEditor = useCallback((target: number | boolean) => {
    setEditorTarget(target);
  }, []);
  const closeEditor = useCallback(() => setEditorTarget(false), []);

  return (
    <Card>
      <CardHeader>
        <TitleLabel title="배송 정보" />
      </CardHeader>
      {res.addresses.map(address => (
        <Fragment key={address.addressId}>
          {editorTarget !== address.addressId && (
            <AddressInfo {...address} startEditor={() => startEditor(address.addressId)} />
          )}
        </Fragment>
      ))}
    </Card>
  );
}

export default Sucecss;
