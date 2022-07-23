import mongoose from 'mongoose'
import { aatMongoose } from '../utils/initialiseMongoose'

interface IUser {
  name: string
  profileImage: string
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
    profileImage: {
      type: String,
      default:
        'https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/Rectangle_48_1.png',
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
