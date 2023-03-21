import express from 'express';
import getTrades from '@controller/trade/getTrades';
import getTradeDetail from '@controller/trade/getTradeDetail';
import postTrade from '@controller/trade/postTrade';
import putTrade from '@controller/trade/putTrade';
import deleteTrade from '@controller/trade/deleteTrade';
import getTradeExchange from '@controller/trade/exchange/getTradeExchange';
import postTradeExchange from '@controller/trade/exchange/postTradeExchange';

const router = express.Router();

router.route('/')
  .get(getTrades)
  .post(postTrade);

router.route('/:tradeId')
  .get(getTradeDetail)
  .put(putTrade)
  .delete(deleteTrade);

router.route('/:tradeId/exchange')
  .get(getTradeExchange)
  .post(postTradeExchange);

export default router;