import mongoose from 'mongoose'
import { aatMongoose } from '../utils/initialiseMongoose'

interface IItem {
  itemFileUrl: string
}

const ItemSchema = new mongoose.Schema<IItem>(
  {
    itemFileUrl: {
      type: String,
    },
  },
  {
    strict: false,
  }
)

const ItemModel = aatMongoose.model<IItem>('item', ItemSchema)

export { ItemModel as Item }
