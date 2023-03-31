import Button from '@component/form/Button';
import { ButtonSection as StyledButtonSection } from './_styles';

interface Props {
  closeEditor: () => void;
}

function ButtonSection({ closeEditor }: Props) {
  return (
    <StyledButtonSection>
      <Button
        styles={{
          width: 'fit-content',
          theme: 'primary-outlined',
          margin: '1em 1em 0 0',
          padding: '0.7em 1.3em',
          iconMargin: '1em',
        }}
        onClick={closeEditor}
      >
        취소
      </Button>
      <Button
        type="submit"
        styles={{
          width: 'fit-content',
          theme: 'primary',
          marginTop: '1em',
          padding: '0.7em 1.3em',
          iconMargin: '1em',
        }}
      >
        저장
      </Button>
    </StyledButtonSection>
  );
}

export default ButtonSection;
