import mongoose from 'mongoose'
import { aatMongoose } from '../utils/initialiseMongoose'

interface IUser {
  name: string
  totalWatchTimeMin: number
  ownedItemIds: [string]
  selectedItemId: string | null
  id: string
  coins: number
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      index: true,
    },
    totalWatchTimeMin: {
      type: Number,
      index: true,
    },
    ownedItemIds: {
      type: [String],
    },
    selectedItemId: {
      type: String,
    },
    id: {
      type: String,
      index: true,
    },
    coins: {
      type: Number,
    },
  },
  {
    strict: false,
  }
)

const UserModel = aatMongoose.model<IUser>('user', UserSchema)

export { UserModel as User }
