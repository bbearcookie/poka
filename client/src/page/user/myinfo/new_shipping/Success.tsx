import { useState, useCallback } from 'react';
import { ResType } from '@api/query/shipping/useShippingAddressesQuery';
import { Card, CardHeader } from '@component/card/new/Card';
import Info from './info/Info';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import Editor from './editor/Editor';
import AddButton from './button/AddButton';
import Writer from './editor/Writer';

interface Props {
  res: ResType;
  userId: number;
}

function Success({ res, userId }: Props) {
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

      {res.addresses.map(address =>
        editorTarget === address.addressId ? (
          <Editor key={address.addressId} address={address} closeEditor={closeEditor} />
        ) : (
          <Info
            key={address.addressId}
            address={address}
            startEditor={() => startEditor(address.addressId)}
          />
        )
      )}

      {editorTarget === true ? (
        <Writer userId={userId} closeEditor={closeEditor} />
      ) : (
        <AddButton addressLength={res.addresses.length} startEditor={() => startEditor(true)} />
      )}
    </Card>
  );
}

export default Success;
