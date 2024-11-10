import { getMessages, getUsers, saveMessage, userConnected, userDisconnected } from '@/controllers/sockets'
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
        socket.disconnect()
        return;
      }

      const user = await userConnected(uid)

      const users = await getUsers(uid)
      this.io.emit('user-list', users)


      socket.on('getMessages', async (data: { userId: string }) => {
        const { userId } = data;

        if (!userId) {
          console.warn(`userId es undefined para la solicitud de mensajes entre ${uid}`);
          socket.emit('messages', { userId: null, messages: [] });
          return;
        }

        try {
          const messages = await getMessages(uid, userId);
          socket.emit('messages', { userId, messages });
        } catch (error) {
          console.error(`Error al obtener mensajes entre ${uid} y ${userId}:`, error);
          socket.emit('messages', { userId, messages: [] });
        }
      });

        // Manejar el evento 'sendMessage'
        socket.on('sendMessage', async (data: { to: string, content: string }) => {
          const { to, content } = data;
  
          if (!to || !content) {
            console.warn(`Datos incompletos para enviar mensaje: to=${to}, content=${content}`);
            return;
          }
  
          try {
            // Guardar el mensaje en la base de datos
            const message = await saveMessage(uid, to, content);
  
            // Emitir el mensaje al destinatario si está conectado
            const targetSocket = Array.from(this.io.sockets.sockets.values()).find(s => s.handshake.auth.uid === to);
            if (targetSocket) {
              targetSocket.emit('receiveMessage', { from: uid, message });
            }
  
            // Emitir el mensaje al remitente para actualizar su estado local
            socket.emit('receiveMessage', { from: uid, message });
          } catch (error) {
            console.error(`Error al enviar mensaje de ${uid} a ${to}:`, error);
          }
        });

      socket.on('disconnect', async () => {
        userDisconnected(uid)
      })
    })
  }
}

export default Sockets