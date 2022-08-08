import { Express } from 'express';
import testRouter from '@config/route/testRouter';
import groupRouter from '@config/route/groupRouter';
import memberRouter from '@config/route/memberRouter';
import photoRouter from './photoRouter';

export default function(app: Express) {
  testRouter(app, '/api/test');
  groupRouter(app, '/api/group');
  memberRouter(app, '/api/member');
  photoRouter(app, '/api/photo');
};