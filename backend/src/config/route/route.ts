import { Express } from 'express';
import testRouter from '@config/route/testRouter';
import groupRouter from '@config/route/groupRouter';

export default function(app: Express) {
  testRouter(app, '/api/test');
  groupRouter(app, '/api/group');
};