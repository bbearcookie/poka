import React from 'react';
import useModal from '@component/new_modal/useModal';
import { Card } from '@component/card/basic/_styles';
import ConfirmModal from '@component/new_modal/ConfirmModal';
import TitleModal from '@component/new_modal/TitleModal';
import { StyledIndex } from './_styles';

function TestPage() {
  const modal = useModal();

  return (
    <StyledIndex>
      <div>테스트 페이지</div>

      {/* <TitleModal hook={modal} title="타이틀~">
        <div>하하호호</div>
        <div>하하호호</div>
        <div>하하호호하하호호하하호호하하호호하하호호</div>
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i}>{i}</div>
        ))}
        <button onClick={modal.close}>모달 닫기</button>
      </TitleModal> */}

      <ConfirmModal
        hook={modal}
        title="타이틀.."
        cssProp={{ width: '75%', background: 'yellow' }}
      >
        <div>ㅎㅎ 내용</div>
        <div>ㅎㅎ 내용</div>
        <div>ㅎㅎ 내용</div>
      </ConfirmModal>

      <button onClick={modal.open}>모달열기</button>
    </StyledIndex>
  );
}

export default TestPage;
