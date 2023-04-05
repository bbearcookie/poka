import React from 'react';
import useModal from '@component/new_modal/useModal';
import TitleModal from '@component/new_modal/TitleModal';
import { StyledIndex } from './_styles';

function TestPage() {
  const modal = useModal();

  return (
    <StyledIndex>
      테스트 페이지
      <TitleModal hook={modal} title="타이틀~">
        <div>하하호호</div>
        <div>하하호호</div>
        <div>하하호호</div>
        <div>하하호호하하호호하하호호하하호호하하호호</div>
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i}>{i}</div>
        ))}
        <button onClick={modal.close}>모달 닫기</button>
      </TitleModal>
      <button onClick={modal.open}>모달열기</button>
    </StyledIndex>
  );
}

export default TestPage;
