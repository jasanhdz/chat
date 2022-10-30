import 'module-alias/register';
import { config } from '@/config'
import express, { Express, Request, Response } from 'express'

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server, Hello Jasan');
});

app.listen(config.port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${config.port}`);
});