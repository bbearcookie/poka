import { useEffect } from 'react';
import useModal from '@component/modal/useModal';
import ConfirmModal from '@component/modal/ConfirmModal';
import IconButton from '@component/form/iconButton/IconButton';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { StyledIndex } from './_styles';

function TestPage() {
  const modal = useModal();

  useEffect(() => {
    modal.setErrorMessage('asdf');
  }, [modal]);

  return (
    <StyledIndex>
      <div>테스트 페이지</div>

      <IconButton
        iconProps={{ icon: faRightFromBracket }}
        tooltip="툴팁"
        css={{ background: 'yellow' }}
      />

      <ConfirmModal
        hook={modal}
        title="타이틀.."
        cssProp={{ width: '50vw' }}
        confirm={{
          onClick: () => {
            console.log('ㅁㅇㄴㄹ');
          },
        }}
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
