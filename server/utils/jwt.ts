import { config } from '@/config'
import jwt from 'jsonwebtoken'

export const generateJWT = (uid?: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid }

    jwt.sign(payload, config.JWT_KEY, {
      expiresIn: '24h'
    }, (err, token) => {
      if (err || !token) {
        console.log(err)
        reject('No se pudo generar el JWT')
      } else {
        resolve(token)
      }
    })

  })
}