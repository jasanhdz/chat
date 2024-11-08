import { config } from "@/config"
import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

export const validateJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('x-token')

    if(!token) {
      res.status(401).json({
        success: false,
        message: 'No hay un token en la petición'
      })
      return
    }

    const payload = jwt.verify(token, config.JWT_KEY) as JwtPayload
    req.uid = payload.uid

    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token no es válido'
    })
  }
}