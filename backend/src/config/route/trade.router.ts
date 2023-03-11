import express from 'express';
import * as getTrades from '@controller/trade/getTrades';
import * as getTradeDetail from '@controller/trade/getTradeDetail';
import * as postTrade from '@controller/trade/postTrade';
import * as putTrade from '@controller/trade/putTrade';
import * as deleteTrade from '@controller/trade/deleteTrade';
import * as getTradeExchange from '@controller/trade/exchange/getTradeExchange';
import * as postTradeExchange from '@controller/trade/exchange/postTradeExchange';

const router = express.Router();

router.route('/')
  .get(getTrades.validator, getTrades.controller)
  .post(postTrade.validator, postTrade.controller)

router.route('/:tradeId')
  .get(getTradeDetail.validator, getTradeDetail.controller)
  .put(putTrade.validator, putTrade.controller)
  .delete(deleteTrade.validator, deleteTrade.controller)

router.route('/:tradeId/exchange')
  .get(getTradeExchange.validator, getTradeExchange.controller)
  .post(postTradeExchange.validator, postTradeExchange.controller)

export default router;