import Button from '@component/form/Button';
import { StyledButtonSection } from './_styles';

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
