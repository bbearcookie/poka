import { InputMessage } from '@component/form/_styles';
import Button, { ButtonTheme } from '@component/form/button/Button';
import ModalHeader from '@component/modal/basic/ModalHeader';
import Modal, { Props as ModalProps } from '@component/modal/basic/Modal';
import { Card, CardBody, CardFooter } from '@component/card/basic/_styles';
import { ButtonSection } from '@component/form/_styles';

interface ButtonOptions {
  text?: string;
  buttonTheme?: ButtonTheme;
  onClick?: () => void;
}

interface Props extends ModalProps {
  title?: string;
  confirm?: ButtonOptions;
  cancel?: ButtonOptions;
}

function ConfirmModal({ hook, title, confirm, cancel, children, ...rest }: Props) {
  confirm = {
    text: '확인',
    buttonTheme: 'primary',
    onClick: () => {},
    ...confirm,
  };

  cancel = {
    text: '취소',
    buttonTheme: 'gray',
    onClick: hook.close,
    ...cancel,
  };

  return (
    <Modal hook={hook}>
      <Card {...rest}>
        <ModalHeader title={title} handleClose={hook.close} />
        <CardBody>{children}</CardBody>
        <CardFooter
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          {hook.errorMessage && <InputMessage css={{ margin: '0 0 0.5em 0' }}>{hook.errorMessage}</InputMessage>}
          <ButtonSection>
            <Button buttonTheme={confirm.buttonTheme} onClick={confirm.onClick}>
              {confirm.text}
            </Button>
            <Button buttonTheme={cancel.buttonTheme} onClick={cancel.onClick}>
              {cancel.text}
            </Button>
          </ButtonSection>
        </CardFooter>
      </Card>
    </Modal>
  );
}

export default ConfirmModal;
