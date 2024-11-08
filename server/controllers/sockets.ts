import UserSchema from '@/schema/user';

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
    await user.updateOne()

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
