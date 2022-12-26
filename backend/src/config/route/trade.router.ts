import { Express } from 'express';
import * as tradeCtrl from '@controller/trade.ctrl';

export default function(app: Express, baseURI: string) {
  app.post(`${baseURI}`, tradeCtrl.postTrade.validator, tradeCtrl.postTrade.controller);
}