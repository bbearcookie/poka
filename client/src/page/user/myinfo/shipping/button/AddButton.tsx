import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';
import { ButtonSection } from '@component/form/_styles';

interface Props {
  addressLength: number;
  startEditor: () => void;
}

function AddButton({ addressLength, startEditor }: Props) {
  const onClick = useCallback(() => {
    if (addressLength >= 10)
      return toast.error('배송지를 더 이상 추가할 수 없어요!', {
        autoClose: 5000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    startEditor();
  }, [startEditor, addressLength]);

  return (
    <ButtonSection css={{ marginTop: '2em' }}>
      <Button
        buttonTheme="primary"
        leftIcon={faPlus}
        iconMargin="1em"
        onClick={onClick}
        css={{
          margin: '1.57em',
          padding: '0.7em 1em',
        }}
      >
        추가
      </Button>
    </ButtonSection>
  );
}

export default AddButton;
