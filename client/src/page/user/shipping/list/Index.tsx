import TitleLabel from '@component/label/TitleLabel';
import Button from '@component/form/button/Button';
import ShippingSection from './ShippingSection';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { StyledIndex } from './_styles';
import { Link } from 'react-router-dom';

function Index() {
  return (
    <StyledIndex>
      <TitleLabel title="배송요청 목록" css={{ marginBottom: '1em' }}>
        <Link to="/shipping/writer">
          <Button
            buttonTheme="primary"
            leftIcon={faPen}
            iconMargin="1em"
            css={{ justifySelf: 'center' }}
          >
            등록
          </Button>
        </Link>
      </TitleLabel>
      <ShippingSection />
    </StyledIndex>
  );
}

export default Index;
