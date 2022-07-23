import mongoose from 'mongoose'
import { aatMongoose } from '../utils/initialiseMongoose'

interface IUser {
  name: string
  totalWatchTimeMin: number
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
  },
  {
    strict: false,
  }
)

const UserModel = aatMongoose.model<IUser>('user', UserSchema)

export { UserModel as User }
