import Button from '@component/form/Button';
import { ButtonSection as StyledButtonSection } from '@component/form/_styles';

interface Props {
  closeEditor: () => void;
}

function ButtonSection({ closeEditor }: Props) {
  return (
    <StyledButtonSection>
      <Button
        buttonTheme="primary-outlined"
        iconMargin='1em'
        css={{
          width: 'fit-content',
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
        buttonTheme="primary"
        iconMargin='1em'
        css={{
          width: 'fit-content',
          marginTop: '1em',
          padding: '0.7em 1.3em',
        }}
      >
        저장
      </Button>
    </StyledButtonSection>
  );
}

export default ButtonSection;
