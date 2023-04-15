import Button from '@component/form/button/Button';
import { ButtonSection as StyledButtonSection } from '@component/form/_styles';

interface Props {
  closeEditor: () => void;
}

function ButtonSection({ closeEditor }: Props) {
  return (
    <StyledButtonSection>
      <Button
        buttonTheme="primary-outlined"
        iconMargin="1em"
        css={{
          width: 'fit-content',
          padding: '0.7em 1.3em',
        }}
        onClick={closeEditor}
      >
        취소
      </Button>
      <Button
        type="submit"
        buttonTheme="primary"
        iconMargin="1em"
        css={{
          width: 'fit-content',
          padding: '0.7em 1.3em',
        }}
      >
        저장
      </Button>
    </StyledButtonSection>
  );
}

export default ButtonSection;
