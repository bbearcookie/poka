import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@component/form/Button';

interface Props {
  handleSubmit: () => void;
}

function ButtonSection({ handleSubmit }: Props) {
  const navigate = useNavigate();

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <section className="button-section">
      <Button
        buttonTheme="primary-outlined"
        iconMargin='1em'
        css={{
          padding: '1em 2em',
        }}
        onClick={handleCancel}
      >
        취소
      </Button>
      <Button
        buttonTheme="primary"
        iconMargin='1em'
        type="button"
        css={{
          padding: '1em 2em',
        }}
        onClick={handleSubmit}
      >
        발급
      </Button>
    </section>
  );
}

export default ButtonSection;
