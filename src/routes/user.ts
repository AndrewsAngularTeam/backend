import express, { Request, Response } from 'express'
import { User } from '../models'

const router = express.Router()

router.get('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params
  console.log('UserId', userId)
  const userDetails = await User.findOne({
    id: userId,
  })
    .lean()
    .exec()

  if (userDetails === null) {
    return res.status(400).send('The user does not exist')
  }
  if (userDetails['selectedItemId'] === undefined) {
    userDetails['selectedItemId'] = null
  }
  return res.status(200).json(userDetails)
})

export { router }
