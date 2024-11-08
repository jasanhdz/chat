import { config } from '@/config'
import jwt, { JwtPayload } from 'jsonwebtoken'

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

export const checkJWT = (token: string) => {
  try {
    const { uid } = jwt.verify(token, config.JWT_KEY) as JwtPayload

    return [true, uid]
  } catch (error) {
    return [false, null]
  }
}