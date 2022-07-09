import { Express } from 'express';
import TestRouter from '@config/route/testRouter';

export default function(app: Express) {
  TestRouter(app, '/api/test');
};