import Button from '@component/form/button/Button';
import { ButtonSection } from '@component/form/_styles';

interface Props {
  handleCancel?: () => void;
  handleSubmit?: () => void;
}

function Buttons({ handleCancel, handleSubmit }: Props) {
  return (
    <ButtonSection as="footer">
      <Button
        buttonTheme="primary-outlined"
        css={{
          width: 'fit-content',
          padding: '0.7em 1.3em',
        }}
        onClick={handleCancel}
      >
        취소
      </Button>
      <Button
        buttonTheme='primary'
        css={{
          width: 'fit-content',
          padding: '0.7em 1.3em',
        }}
        onClick={handleSubmit}
      >
        저장
      </Button>
    </ButtonSection>
  );
}

export default Buttons;
