import express, { Request, Response } from 'express';
import { Company, ParamType } from 'src/types';

const router = express.Router();

export const companiesRoutes = (params: ParamType) => {
  const { companiesService } = params;
  router.get('/', async (request: Request, response: Response, next: Function) => {
    try {
      const companies = await companiesService.getList();

      return response.json(companies);
    } catch (error) {
      return next(error);
    }
  });

  router.post('/', async (request: Request, response: Response, next: Function) => {
    try {
      const {
        name,
        sector,
        siren,
        results
      } = request.body;

      const newCompany: Company = {
        name,
        sector,
        siren,
        results
      };

      await companiesService.addCompany(newCompany);

      return response.json(newCompany);
    } catch (error) {
      return next(error);
    }
  });

  router.get('/:siren', async (request: Request, response: Response, next: Function) => {
    try {
      const { siren } = request.params;
      const company = await companiesService.getBySiren(Number(siren));

      return response.json(company);
    } catch (error) {
      return next(error);
    }
  });

  router.get('/filter/:sector', async (request: Request, response: Response, next: Function) => {
    try {
      const { sector } = request.params;
      const companies = await companiesService.getBySector(sector);

      if (companies.length === 0) {
        return response.json({
          message: `no company of the sector "${sector}" was found`,
        });
      }

      return response.json(companies);
    } catch (error) {
      return next(error);
    }
  });

  router.get('/:siren/compare', async (request: Request, response: Response, next: Function) => {
    try {
      const { siren } = request.params;
      const result = await companiesService.getTwoLastYearsResults(Number(siren));

      if (result === undefined) {
        return response.json({
          message: `no entry found for the two last year results`,
        });
      }

      return response.json(result);
    } catch (error) {
      return next(error);
    }
  });

  router.put('/:siren', async (request: Request, response: Response, next: Function) => {
    try {
      const {
        name,
        sector,
        siren,
        results
      } = request.body;

      const newCompany: Company = {
        name,
        sector,
        siren,
        results
      };
      await companiesService.updateCompany(newCompany);

      const updated = await companiesService.getBySiren(Number(siren));

      return response.json(updated);
    } catch (error) {
      return next(error);
    }
  });

  router.delete('/:siren', async (request: Request, response: Response, next: Function) => {
    try {
      const { siren } = request.params;
      await companiesService.removeBySiren(Number(siren));

      return response.json({
        message: 'company successfully removed!'
      });
    } catch (error) {
      return next(error);
    }
  });

  return router;
};