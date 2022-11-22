import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';

interface AddButtonProps {
  addressLength: number;
  startEditor: () => void;
  children?: React.ReactNode;
}
const AddButtonDefaultProps = {};

function AddButton({ addressLength, startEditor, children }: AddButtonProps & typeof AddButtonDefaultProps) {

  const handleAddButton = useCallback(() => {
    if (addressLength >= 10)
      return toast.error('배송지를 더 이상 추가할 수 없어요!', { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
    startEditor();
  }, [startEditor, addressLength]);

  return (
    <section className="button-section">
      <Button
        styles={{
          theme: "primary",
          margin: "1.57em",
          padding: "0.7em 1em",
          iconMargin: "1em",
        }}
        leftIcon={faPlus}
        onClick={handleAddButton}
      >추가</Button>
    </section>
  );
}

AddButton.defaultProps = AddButtonDefaultProps;
export default AddButton;