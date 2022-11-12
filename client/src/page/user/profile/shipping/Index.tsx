import React, { useState, useCallback } from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Recipient from './Recipient';
import AddButton from './AddButton';
import Editor from './editor/Index';

interface IndexProps {
  userId: number;
  children?: React.ReactNode;
}
const IndexDefaultProps = {};

function Index({ userId, children }: IndexProps & typeof IndexDefaultProps) {
  const [editorTarget, setEditorTarget] = useState<number | boolean>(false); // 수정 모드일 경우 현재 수정중인 memberId를 나타낸다.

  // 편집 모드 ON / OFF
  const startEditor = useCallback((target: number | boolean) => setEditorTarget(target), []);
  const closeEditor = useCallback(() => setEditorTarget(false), []);

  return (
    <Card className="shipping-section">
      <CardHeader>
        <h1 className="subtitle-label">배송 정보</h1>
      </CardHeader>
      <CardBody styles={{ padding: "0" }}>
        <Recipient />
        <Recipient />
        <Recipient />
        {editorTarget === true && <Editor closeEditor={closeEditor} />}
        {editorTarget !== true && <AddButton startEditor={() => startEditor(true)} />}
      </CardBody>
    </Card>
  );
}

Index.defaultProps = IndexDefaultProps;
export default Index;