import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@component/form/button/Button';
import { ButtonSection as StyledButtonSection } from '@component/form/_styles';

interface Props {
  handleSubmit: () => void;
}

function ButtonSection({ handleSubmit }: Props) {
  const navigate = useNavigate();

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <StyledButtonSection>
      <Button
        buttonTheme="primary-outlined"
        iconMargin='1em'
        css={{
          padding: '1em 2em',
        }}
        onClick={handleCancel}
      >
        취소
      </Button>
      <Button
        buttonTheme="primary"
        iconMargin='1em'
        type="button"
        css={{
          padding: '1em 2em',
        }}
        onClick={handleSubmit}
      >
        발급
      </Button>
    </StyledButtonSection>
  );
}

export default ButtonSection;
