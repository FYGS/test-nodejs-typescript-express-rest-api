import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();


const PORT = process.env.PORT || 8080;
const app: Express = express();


app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Working!');
});


app.listen(PORT, () => {
  console.log(`Server Up and Running on ${PORT} ⚡`);
});