import { useAppSelector } from '@app/redux/store';
import TitleLabel from '@component/label/TitleLabel';
import TradeList from '@component/list/trade/TradeList';
import { StyledIndex } from './_styles';

function Index() {
  const { userId } = useAppSelector(state => state.auth);

  return (
    <StyledIndex>
      <TitleLabel title="내가 등록한 교환" css={{ marginBottom: '2em' }} />

      <TradeList
        location={{
          to: '/trade/detail',
          state: {
            prev: {
              url: '/trade/mine',
              text: '내 교환',
            },
          },
        }}
        filter={{ userId, state: 'trading' }}
      />
    </StyledIndex>
  );
}

export default Index;
