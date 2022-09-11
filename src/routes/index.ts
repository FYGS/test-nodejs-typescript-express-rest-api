import express from 'express';
import { ParamType } from 'src/types';

import { companiesRoutes } from './companies-routes';

const router = express.Router();

export const routes = (params: ParamType) => {
  router.get('/', (req, res) => {
    res.redirect('/companies')
  });
  router.use('/companies', companiesRoutes(params));

  return router;
};
