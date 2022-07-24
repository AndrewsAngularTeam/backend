import mongoose from 'mongoose'
import { aatMongoose } from '../utils/initialiseMongoose'

interface IChat {
  videoId: string
  comments: [
    {
      timestamp: number
      text: string
    }
  ]
}

const ChatSchema = new mongoose.Schema<IChat>(
  {
    videoId: {
      type: String,
      index: true,
    },
    comments: [
      {
        timestamp: {
          type: Number,
        },
        text: {
          type: String,
        },
      },
    ],
  },
  {
    strict: false,
  }
)

const ChatModel = aatMongoose.model<IChat>('chat', ChatSchema)

export { ChatModel as Chat }
