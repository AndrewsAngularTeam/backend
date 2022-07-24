import express, { Request, Response } from 'express'
import { User } from '../models'

const router = express.Router()

router.get('', async (req: Request, res: Response) => {
  const comments = {
    1: ['time is 1s'],
    2: ['time is 2s'],
    4: ['time is 4s'],
    8: ['time is 8s'],
  }

  return res.status(200).json(comments)
})

export { router }
