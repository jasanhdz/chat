import UserSchema from '@/schema/user';
import MessageSchema from '@/schema/message';

/**
 * Marca al usuario como conectado en la base de datos y retorna la información relevante del usuario.
 * @param uid - ID único del usuario.
 * @returns Objeto con la información del usuario o null si no se encuentra.
 */
export const userConnected = async (uid: string) => {
  try {
    // Buscar al usuario por su ID
    const user = await UserSchema.findById(uid);

    if (!user) {
      console.warn(`Usuario con ID ${uid} no encontrado.`);
      return null;
    }

    // Actualizar el estado de conexión
    user.online = true;
    await user.save()

    // Retornar solo la información necesaria del usuario
    return user
  } catch (error) {
    console.error(`Error al marcar al usuario ${uid} como conectado:`, error);
    return null;
  }
};

/**
 * Marca al usuario como desconectado en la base de datos.
 * @param uid - ID único del usuario.
 * @returns Booleano indicando si la operación fue exitosa.
 */
export const userDisconnected = async (uid: string): Promise<boolean> => {
  try {
    // Buscar al usuario por su ID
    const user = await UserSchema.findById(uid);

    if (!user) {
      console.warn(`Usuario con ID ${uid} no encontrado.`);
      return false;
    }

    // Actualizar el estado de conexión
    user.online = false;
    await user.updateOne()

    return true;
  } catch (error) {
    console.error(`Error al marcar al usuario ${uid} como desconectado:`, error);
    return false;
  }
};


export const getUsers = async (uid: string) => {
  try {
    // Buscar todos los usuarios donde _id no es igual a uid
    const users = await UserSchema.find({ _id: { $ne: uid } })
      .sort('-online') // Ordenar por el campo 'online' en orden descendente

    return users
  } catch (error) {
    console.error(`Error al obtener usuarios:`, error)
    throw new Error('No se pudo obtener la lista de usuarios.')
  }
}

/**
 * Obtiene los mensajes entre dos usuarios.
 * @param fromUid - UID del usuario que envía.
 * @param toUid - UID del usuario que recibe.
 * @returns Una lista de mensajes.
 */
export const getMessages = async (fromUid: string, toUid: string): Promise<any[]> => {
  const messages = await MessageSchema.find({
    $or: [
      { from: fromUid, to: toUid },
      { from: toUid, to: fromUid },
    ]
  }).sort({ timestamp: 1 }); // Ordenar de menor a mayor (antiguos primero)
  
  return messages;
}

/**
 * Guarda un mensaje en la base de datos.
 * @param fromUid - UID del usuario que envía el mensaje.
 * @param toUid - UID del usuario que recibe el mensaje.
 * @param content - Contenido del mensaje.
 * @param messageType - Tipo de mensaje ('text' o 'image').
 * @param imageMessage - Objeto que contiene datos específicos de mensajes de imagen.
 * @returns El mensaje guardado.
 */
export const saveMessage = async (
  fromUid: string,
  toUid: string,
  content: string,
  messageType: 'text' | 'image' = 'text',
  imageMessage?: { jpegThumbnail?: string }
): Promise<any> => {
  if (!fromUid || !toUid || !content) {
    throw new Error('Parámetros incompletos para guardar el mensaje.');
  }

  // Crear una nueva instancia de mensaje
  const message = new MessageSchema({
    from: fromUid,
    to: toUid,
    content,
    messageType,
    imageMessage: messageType === 'image' ? imageMessage : undefined,
  });

  // Guardar el mensaje en la base de datos
  await message.save();

  // Opcional: Población de campos para retornar datos más completos
  await message.populate('from', 'uid fullName avatar');
  await message.populate('to', 'uid fullName avatar');

  return message;
};