import express, { Application } from 'express'
import cors from 'cors'
import path from 'path'
import { Server as HttpServer, createServer } from 'http'
import { Server as SocketIO } from 'socket.io'
import { config } from '@/config';
import Sockets from '@/models/sockets'
import { dbConnection } from '@/database/config'

class Server {
  private app: Application
  private port: string
  private server: HttpServer
  private io: SocketIO
  
  constructor() {
    this.app = express();
    this.port = config.port;
    this.server = createServer(this.app)
    this.io = new SocketIO(this.server, {
      cors: {
        origin: 'http://localhost:3000', // Cambia según el origen de tu frontend
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-token'],
        credentials: true,
      },
    })

    this.initDB()
    this.middlewares()
    this.routes()
    this.socketsInit()
    
  }

  socketsInit() {
    new Sockets(this.io)
  }

  initDB() {
    dbConnection()
  }

  routes() {
    this.app.use('/api/login', require('@/routes/auth').default)
    this.app.use('/api/messages', require('@/routes/messages').default)
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, 'dist/public')))
    this.app.use(cors())
    this.app.use(express.json())
  }

  listen() {
    // init server
    this.server.listen(this.port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${this.port}`)
    })
  }
}

export default Server