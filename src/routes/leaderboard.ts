import express, { Request, Response } from 'express'
import { User } from '../models'

const router = express.Router()

router.get('', async (req: Request, res: Response) => {
  const topTen = await User.find({
    privateMode: { $ne: true },
  })
    .sort({ totalWatchTimeMin: -1 })
    .limit(10)
    .lean()
    .exec()
  return res.status(200).send(topTen)
})

export { router }
