import { Server as SocketIO } from 'socket.io'

class Sockets {
  private io: SocketIO
  
  constructor(io: SocketIO) {
    this.io = io
    this.clientConnect()
  }

  clientConnect() {
    this.io.on('connection', async (socket) => {
      console.warn('cliente conectado')
    })
  }
}

export default Sockets