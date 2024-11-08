import { Request, Response } from 'express'
import User from '@/schema/user'

export const createUser = async (req: Request, res: Response) => {
  try {
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

    res.json({
      success: true,
      user
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
  const body = req.body;
  res.json({
    success: true,
    message: 'Login',
    body
  })
}

export const renewToken = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'renewToken'
  })
}

