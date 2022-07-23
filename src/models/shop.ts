import mongoose from 'mongoose'
import { aatMongoose } from '../utils/initialiseMongoose'

type ItemType = 'model' | 'theme' | 'voice'

interface Shop {
  id: string
  name: string
  cost: number
  itemType: string
  resource: string // The url to the resource
}

const ShopSchema = new mongoose.Schema<Shop>(
  {
    name: {
      type: String,
      index: true,
    },
    cost: {
      type: Number,
    },
    itemType: {
      type: String,
      index: true,
    },
    resource: {
      type: String,
    },
  },
  {
    strict: false,
  }
)

const ShopModel = aatMongoose.model<Shop>('shop', ShopSchema)

export { ShopModel as Shop }
