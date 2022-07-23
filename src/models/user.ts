import mongoose from 'mongoose'
import { aatMongoose } from '../utils/initialiseMongoose'

interface IUser {
  name: string
  totalWatchTimeMin: number
  ownedItemIds: [string]
  selectedItemId: string | null
  id: string
  coins: number
  privateMode: boolean
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
      default: 0,
    },
    ownedItemIds: {
      type: [String],
      default: [],
    },
    selectedItemId: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      index: true,
    },
    coins: {
      type: Number,
      default: 0,
    },
    privateMode: {
      type: Boolean,
      default: false,
    },
  },
  {
    strict: false,
  }
)

const UserModel = aatMongoose.model<IUser>('user', UserSchema)

export { UserModel as User }
