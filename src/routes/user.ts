import { checkUserExist } from '../utils/user'
import express, { NextFunction, Request, Response } from 'express'
import { User } from '../models'
import { MINUTE_TO_COIN_RATIO } from '../utils/constants'

const router = express.Router()

router.get('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params
  console.log('UserId', userId)

  const checkingResult = await checkUserExist(userId)
  if (checkingResult === null) {
    return res
      .status(400)
      .send('User ID does not exist. Please create the user first.')
  }

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

router.post(
  '/:userId/updatePrivateMode',
  async (req: Request, res: Response) => {
    const { userId } = req.params
    const { privateMode } = req.body

    const checkingResult = await checkUserExist(userId)
    if (checkingResult === null) {
      return res
        .status(400)
        .send('User ID does not exist. Please create the user first.')
    }

    console.log('userId', userId)
    console.log('privateMode', privateMode)

    if (userId == null || privateMode == null) {
      return res.status(400).send('User ID or Private MOde is null.')
    }

    const result = await User.findOneAndUpdate(
      {
        id: userId,
      },
      {
        privateMode: privateMode,
      },
      {
        new: true,
      }
    )
      .lean()
      .exec()

    return res.status(200).json(result)
  }
)

router.post('/:userId/addTime', async (req: Request, res: Response) => {
  const { userId } = req.params
  const { minutes } = req.body

  const checkingResult = await checkUserExist(userId)
  if (checkingResult === null) {
    return res
      .status(400)
      .send('User ID does not exist. Please create the user first.')
  }

  console.log('userId', userId)
  console.log('minutes', minutes)

  if (userId == null || minutes == null) {
    return res.status(400).send('User ID or Minutes is null.')
  }

  const coinsToAdd = MINUTE_TO_COIN_RATIO * minutes

  const result = await User.findOneAndUpdate(
    {
      id: userId,
    },
    {
      $inc: {
        coins: coinsToAdd,
        totalWatchTimeMin: minutes,
      },
    },
    {
      new: true,
    }
  )
    .lean()
    .exec()

  return res.status(200).json(result)
})

export { router }
