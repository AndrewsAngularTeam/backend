import mongoose from 'mongoose'
import { aatMongoose } from '../utils/initialiseMongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
    },
  },
  {
    strict: false,
  }
)

const User = aatMongoose.model('user', UserSchema)

export { User }
