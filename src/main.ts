import { config } from '@/config'
import express, { Express, Request, Response } from 'express'
import routes from '@/routes'
import cors from 'cors'

const app: Express = express();

app.use(cors())
app.use('/api', routes)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server, Hello World!');
});

app.listen(config.port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${config.port}`);
});