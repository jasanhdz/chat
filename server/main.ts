import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { config } from '@/config'
import routes from '@/routes/index'

const app: Express = express()

app.use(cors())
app.use('/api', routes)

app.use(cors())
app.use(express.static('dist/public'))
app.use(
    express.static('dist', {
        setHeaders: (res) => res.type('application/javascript'),
    })
)

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server, Hello World!')
})

app.listen(config.port, () => {
    console.log(
        `⚡️[server]: Server is running at https://localhost:${config.port}`
    )
})
