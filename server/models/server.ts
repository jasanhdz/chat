import express, { Application, Express, Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import { Server as HttpServer, createServer } from 'http'
import { Server as SocketIO } from 'socket.io'
import { config } from '@/config';
import Sockets from '@/models/sockets'
import authRoutes from '@/routes/auth' 
import { dbConnection } from '@/database/config'

class Server {
  private app: Application
  private port: string
  private server: HttpServer
  private io: SocketIO
  
  constructor() {
    this.app = express();
    this.port = config.port;

    // connect to db
    dbConnection()

    this.server = createServer(this.app)
    this.io = new SocketIO(this.server)
  }

  socketsInit() {
    new Sockets(this.io)
  }

  routes() {}

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, 'dist/public')))
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use('/api/login', authRoutes)
  }

  listen() {
    // init middlewares
    this.middlewares()

    // init sockets

    this.server.listen(this.port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${this.port}`)
    })
  }
}

export default Server