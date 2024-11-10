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
}

export default User