import { useAppSelector } from '@app/redux/store';
import { TradeItem } from '@type/trade';
import Edit from './Edit';
import Exchange from './Exchange';
import { ButtonSection as StyledButtonSection } from './_styles';

interface Props {
  trade: TradeItem;
}

function ButtonSection({ trade }: Props) {
  const { userId } = useAppSelector(state => state.auth);

  return (
    <StyledButtonSection>
      {trade.state === 'trading' &&
      <>
        {trade.author.userId === userId && <Edit trade={trade} />}
        {trade.author.userId !== userId && <Exchange trade={trade} />}
      </>}
    </StyledButtonSection>
  );
}

export default ButtonSection;