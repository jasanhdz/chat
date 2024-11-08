import { Request, Response } from 'express'
import User, { IUserDocument } from '@/schema/user'
import { generateJWT } from '@/utils/jwt'

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log('body:', req.body)
    const { email } = req.body
    const isEmailExist = await User.findOne({ email })
    if (isEmailExist) {
      res.status(400).json({
        success: false,
        message: 'El email ya existe'
      })
      return
    }

    // Save user
    const user = new User(req.body)
    await user.save()

    // Generate JWT
    const token = await generateJWT(user.uid)

    res.json({
      success: true,
      user,
      token
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Hable con el administrador'
    })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const userDB: IUserDocument | null = await User.findOne({ email }).select('+password')

    if (!userDB) {
      res.status(404).json({
        success: false,
        message: 'Email no encontrado'
      })
      return
    }

    // valid Password
    const validPassword: boolean = await userDB.comparePassword(password);
    console.log({ validPassword })
    if (!validPassword) {
      res.status(400).json({
        success: false,
        message: 'Contraseña no es correcta',
      });
      return;
    }

    const userJson = userDB.toJSON();

    const token = await generateJWT(userJson.uid)

    res.json({
      success: true,
      user: userJson,
      token
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Hable con el administrador'
    })
  }
}

export const renewToken = async (req: Request, res: Response) => {
  const uid = req.uid
  const token = await generateJWT(uid)
  const user = await User.findById(uid)

  res.json({
    success: true,
    token,
    user
  })
}

