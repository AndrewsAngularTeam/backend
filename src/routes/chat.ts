import express, { Request, Response } from 'express'
import { Chat } from '../models'

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

router.get('/:videoId', async (req: Request, res: Response) => {
  const { videoId } = req.params
  if (videoId == null) {
    return res.status(400).send('videoId is not in param.')
  }

  const chatObj = await Chat.findOne({
    videoId: videoId,
  })
    .lean()
    .exec()
  if (chatObj === null) {
    return res.status(400).send('The videoId is not valid.')
  }

  const transformedMap: any = {}
  for (const comment of chatObj.comments) {
    const arrReference = transformedMap[comment.timestamp]
    if (arrReference === undefined) {
      transformedMap[comment.timestamp] = [comment.text]
      continue
    }
    arrReference.push(comment.text)
  }

  return res.status(200).json(transformedMap)
})

router.post('/:videoId', async (req: Request, res: Response) => {
  const { videoId } = req.params
  const { timestamp, text } = req.body

  const checkChatExist = await Chat.findOne({
    videoId: videoId,
  })
    .select('')
    .lean()
    .exec()

  if (checkChatExist === null) {
    await Chat.create({
      videoId: videoId,
      comments: [
        {
          timestamp: timestamp,
          text: text,
        },
      ],
    })

    return res.status(200).send('ok')
  }

  await Chat.findOneAndUpdate(
    {
      videoId: videoId,
    },
    {
      $push: {
        comments: {
          timestamp: timestamp,
          text: text,
        },
      },
    }
  )
  return res.status(200).send('ok')
})

export { router }
