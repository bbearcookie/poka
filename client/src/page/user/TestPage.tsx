import React from 'react';
import useModal from '@component/new_modal/useModal';
import Modal from '@component/new_modal/basic/Modal';
import TitleModal from '@component/new_modal/TitleModal';
import { Card } from '@component/card/basic/_styles';

function TestPage() {
  const modal = useModal();

  return (
    <div>
      테스트 페이지
      {/* <Modal hook={modal} position={{ horizontal: "CENTER", vertical: "CENTER"}}>
        <Card>
          <div>하하호호</div>
          <div>하하호호</div>
          <div>하하호호</div>
          <div>하하호호하하호호하하호호하하호호하하호호</div>
          {Array.from({length: 60}).map((_, i) => <div key={i}>{i}</div>)}
          <button onClick={modal.close}>모달 닫기</button>
        </Card>
      </Modal> */}
      <TitleModal hook={modal} title="제목입니다" position={{ horizontal: "RIGHT", vertical: "TOP" }}>
        <div>하하호호</div>
        <div>하하호호</div>
        <div>하하호호</div>
        <div>하하호호하하호호하하호호하하호호하하호호</div>
        {Array.from({length: 60}).map((_, i) => <div key={i}>{i}</div>)}
      </TitleModal>
      <button onClick={modal.open}>모달열기</button>
    </div>
  );
}

export default TestPage;
