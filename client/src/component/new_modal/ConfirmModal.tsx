import { CSSProp } from 'styled-components';
import { InputMessage } from '@component/form/_styles';
import Button from '@component/form/new/Button';
import ModalHeader from '@component/new_modal/basic/ModalHeader';
import Modal, { Props as ModalProps } from '@component/new_modal/basic/Modal';
import { Card, CardBody, CardFooter } from '@component/card/basic/_styles';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { ButtonSection } from './_styles';

interface Props extends ModalProps {
  title?: string;
  cssProp?: CSSProp;
}

function ConfirmModal({ hook, title, cssProp, children }: Props) {
  return (
    <Modal hook={hook}>
      <Card css={cssProp}>
        <ModalHeader title={title} handleClose={hook.close} />
        <CardBody>{children}</CardBody>
        <CardFooter
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <InputMessage>에러라네~</InputMessage>
          <ButtonSection>
            <Button
              type="button"
              onClick={() => console.log("ㅎㅎ")}
              buttonTheme="primary-outlined"
              iconMargin="2em"
              leftIcon={faHome}
              rightIcon={faHome}
            >
              아아
            </Button>
            <Button buttonTheme="mint">아아</Button>
          </ButtonSection>
        </CardFooter>
      </Card>
    </Modal>
  );
}

export default ConfirmModal;
