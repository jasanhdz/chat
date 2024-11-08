import { userConnected, userDisconnected } from '@/controllers/sockets'
import { checkJWT } from '@/utils/jwt'
import { Socket, Server as SocketIO } from 'socket.io'

class Sockets {
  private io: SocketIO
  
  constructor(io: SocketIO) {
    this.io = io
    this.clientConnect()
  }

  clientConnect() {
    this.io.on('connection', async (socket: Socket) => {
      const [isValid, uid] = checkJWT(socket.handshake.auth.token)
      if (!isValid) {
        console.log('socket no identificado')
        socket.disconnect()
        return;
      }

      const user = await userConnected(uid)


      console.log('cliente conectado:', user)

      // TODO: validat jwt

      // TODO: si el token no es valido, desconectar,

      // TODO: Saber que usuaruo está activo mediante el UID

      // TODO: Emitir todos los usuarios conectados

      // TODO: Socket, join, uid

      // TODO: Escuchar cuando el cliente manda un mensaje-personal

      /** 
       * TODO: Disconnect
       * Marcar en la BD que el usuario se desconecto
       * Emitir todos los usuarios conectados
       * */
      socket.on('disconnect', async () => {
        userDisconnected(uid)
        console.log('cliente desconectado', uid)
      })
    })
  }
}

export default Sockets