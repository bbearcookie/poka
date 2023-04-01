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
        styles={{
          theme: 'primary-outlined',
          padding: '1em 2em',
          marginLeft: '1em',
        }}
        onClick={handleCancel}
      >
        취소
      </Button>
      <Button
        type="button"
        styles={{
          theme: 'primary',
          padding: '1em 2em',
          marginLeft: '1em',
        }}
        onClick={handleSubmit}
      >
        전송
      </Button>
    </StyledButtonSection>
  );
}

export default ButtonSection;
