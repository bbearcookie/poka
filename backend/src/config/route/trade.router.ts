import { Express } from 'express';
import * as tradeCtrl from '@controller/trade.ctrl';

export default function(app: Express, baseURI: string) {
  app.get(`${baseURI}`, tradeCtrl.getTradeList.validator, tradeCtrl.getTradeList.controller);
  app.get(`${baseURI}/:tradeId`, tradeCtrl.getTradeDetail.validator, tradeCtrl.getTradeDetail.controller);
  app.post(`${baseURI}`, tradeCtrl.postTrade.validator, tradeCtrl.postTrade.controller);
  app.delete(`${baseURI}/:tradeId`, tradeCtrl.deleteTrade.validator, tradeCtrl.deleteTrade.controller);
}