import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';

interface Props {
  children?: React.ReactNode;
  startEditor: () => void;
}
const DefaultProps = {};

function MemberAddButton({ startEditor, children }: Props) {
  return (
    <section className="f-right">
      <Button
        styles={{
          theme: "primary",
          margin: "1.57em",
          padding: "0.7em 1em",
          iconMargin: "1em",
        }}
        leftIcon={faPlus}
        onClick={startEditor}
      >추가</Button>
  </section>
  );
}

export default MemberAddButton;