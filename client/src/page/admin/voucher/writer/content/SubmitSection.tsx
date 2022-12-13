import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@component/form/Button';

interface Props {}
const DefaultProps = {};

function SubmitSection({  }: Props) {
  const navigate = useNavigate();

  return (
    <section className="button-section">
      <Button
        styles={{
          theme: "primary-outlined",
          padding: "1em 2em",
          marginLeft: "1em"
        }}
        onClick={() => navigate(-1)}
      >취소</Button>
      <Button
        type="submit"
        styles={{
          theme: "primary",
          padding: "1em 2em",
          marginLeft: "1em"
        }}
      >발급</Button>
    </section>
  );
}

export default SubmitSection;