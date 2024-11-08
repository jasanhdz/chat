import { Router, Request, Response } from 'express'

const router = Router()

router.post('/new', async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Hello World!',  })
});

export default router;