import { IUserDocument } from '@/models/User'

declare global {
  namespace Express {
    interface Request {
      uid?: string;
    }
  }
}