import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { routes } from './routes';
import { CompaniesService } from './services';

dotenv.config();


const app: Express = express();
const PORT = process.env.PORT || 8080;

// Instanciation
const companiesService = new CompaniesService('./src/data/tkt_mock_data.json');


app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes({
  companiesService,
}));


app.listen(PORT, () => {
  console.log(`Server Up and Running on ${PORT} ⚡`);
});
