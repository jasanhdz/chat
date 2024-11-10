class User {
  uid: string
  fullName: string
  email: string
  online: boolean
  createdAt: Date
  updatedAt: Date
  avatar: string | null

  constructor(
    uid: string,
    fullName: string,
    email: string,
    online: boolean,  
    createdAt: Date,
    updatedAt: Date,
    avatar: string | null = null
  ) {
    this.uid = uid
    this.fullName = fullName
    this.email = email
    this.online = online
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.avatar = avatar
  }

    /**
   * Actualiza el estado 'online' del usuario.
   * @param status - Nuevo estado online (true o false).
   */
    setOnline(status: boolean) {
      this.online = status;
      this.updatedAt = new Date(); // Opcional: Actualizar la fecha de actualización
    }
  
}

export default User