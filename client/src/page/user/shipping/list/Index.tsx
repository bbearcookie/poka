import TitleLabel from '@component/label/TitleLabel';
import ShippingSection from './ShippingSection';
import { StyledIndex } from './_styles';

function Index() {
  return (
    <StyledIndex>
      <TitleLabel title="배송요청 목록" css={{ marginBottom: '1em' }} />
      <ShippingSection />
    </StyledIndex>
  );
}

export default Index;
