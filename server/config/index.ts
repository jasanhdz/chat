import dotenv from 'dotenv'
dotenv.config()

const DB_USER = process.env.DB_USER || ''
const DB_PASS = process.env.DB_PASS || ''
const DB_COLLECTION = process.env.DB_COLLECTION || 'chatDB'

export const config = {
  port: process.env.PORT || '3001',
  dev: process.env.NODE_ENV !== 'production',
  DB_CNN_STRING: `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.lriyd47.mongodb.net/${DB_COLLECTION}`
}