import { useAppSelector } from '@app/redux/reduxHooks';
import TitleLabel from '@component/label/TitleLabel';
import Profile from './profile/Index';
import Shipping from './shipping/Index';
import { StyledIndex } from './_styles';

function Index() {
  const { userId } = useAppSelector(state => state.auth);

  return (
    <StyledIndex>
      <TitleLabel title="마이페이지" css={{ marginBottom: "1em" }} />
      <Profile userId={userId} />
      <Shipping userId={userId} />
    </StyledIndex>
  );
}

export default Index;