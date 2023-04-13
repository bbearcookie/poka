import Button from '@component/form/button/Button';
import { ButtonSection as StyledButtonSection } from '@component/form/_styles';

interface Props {
  handleCancel: () => void;
  handleSubmit: () => void;
}

function ButtonSection({ handleCancel, handleSubmit }: Props) {
  return (
    <StyledButtonSection>
      <Button
        buttonTheme="primary-outlined"
        css={{
          padding: '1em 2em',
        }}
        onClick={handleCancel}
      >
        취소
      </Button>
      <Button
        buttonTheme="primary"
        type="button"
        css={{
          padding: '1em 2em',
        }}
        onClick={handleSubmit}
      >
        전송
      </Button>
    </StyledButtonSection>
  );
}

export default ButtonSection;
