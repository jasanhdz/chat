import { Request, Response } from 'express'
import mongoose from 'mongoose'
import MessageSchema from '@/schema/message'

export const getChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const myId = req.uid
    const messageFrom = req.params.from

    if (!myId || !mongoose.Types.ObjectId.isValid(myId)) {
      res.status(400).json({
        success: false,
        message: 'ID de usuario inválido',
      })
      return
    }

    if (!mongoose.Types.ObjectId.isValid(messageFrom)) {
      res.status(400).json({
        success: false,
        message: 'ID de usuario de origen inválido',
      })
      return
    }

    const myObjectId = new mongoose.Types.ObjectId(myId)
    const fromObjectId = new mongoose.Types.ObjectId(messageFrom)

    const lastMessages = await MessageSchema.find({
      $or: [
        { from: fromObjectId, to: myObjectId },
        { from: myObjectId, to: fromObjectId },
      ]
    })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean()

    res.json({
      success: true,
      myId,
      messages: lastMessages
    })
  } catch (error) {
    console.error('Error en getChat:', error)
    res.status(500).json({
      success: false,
      message: 'Error al obtener los mensajes',
    })
  }
}
