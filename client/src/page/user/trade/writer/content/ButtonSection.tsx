import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@component/form/Button';

interface Props {
  titleText: string;
}
const DefaultProps = {};

function ButtonSection({ titleText }: Props) {
  const navigate = useNavigate();
  
  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <section className="button-section">
      <Button
        styles={{
          theme: "primary-outlined",
          padding: "1em 2em",
          marginLeft: "1em"
        }}
        onClick={handleCancel}
      >취소</Button>
      <Button
        type="submit"
        styles={{
          theme: "primary",
          padding: "1em 2em",
          marginLeft: "1em"
        }}
      >{titleText}</Button>
    </section>
  );
}

export default ButtonSection;