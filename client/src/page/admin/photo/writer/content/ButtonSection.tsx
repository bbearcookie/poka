import React, { useCallback } from 'react';
import Button from '@component/form/Button';
import { useNavigate } from 'react-router-dom';

interface Props {}
const DefaultProps = {};

function ButtonSection({  }: Props) {
  const navigate = useNavigate();

  const handleCancel = useCallback(() => {
    navigate('/admin/photo/list')
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
      >작성</Button>
    </section>
  );
}

export default ButtonSection;