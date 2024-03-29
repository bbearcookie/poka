import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@component/form/button/Button';
import { ButtonSection as StyledButtonSection } from '@component/form/_styles';

function ButtonSection() {
  const navigate = useNavigate();

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <StyledButtonSection>
      <Button
        type="button"
        buttonTheme="primary-outlined"
        css={{
          padding: '1em 2em',
        }}
        onClick={handleCancel}
      >
        취소
      </Button>
      <Button
        type="submit"
        buttonTheme="primary"
        css={{
          padding: '1em 2em',
        }}
      >
        등록
      </Button>
    </StyledButtonSection>
  );
}

export default ButtonSection;
