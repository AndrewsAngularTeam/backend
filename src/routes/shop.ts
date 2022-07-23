import express, { Request, Response } from 'express'
import { Shop } from '../models'
import { updateShopArrayObject } from '../utils/objectIdToId'

const router = express.Router()

const addDummy = async () => {
  await Shop.findOneAndUpdate(
    {
      name: 'ExampleAvatar_A',
    },
    {
      name: 'ExampleAvatar_A',
      cost: 200,
      itemType: 'model',
      resource:
        'https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/ExampleAvatar_A.vrm',
    },
    {
      upsert: true,
      new: true,
    }
  )
  await Shop.findOneAndUpdate(
    {
      name: 'ExampleAvatar_B',
    },
    {
      name: 'ExampleAvatar_B',
      cost: 300,
      itemType: 'model',
      resource:
        'https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/ExampleAvatar_B.vrm',
    },
    {
      upsert: true,
      new: true,
    }
  )
  await Shop.findOneAndUpdate(
    {
      name: 'ExampleAvatar_C',
    },
    {
      name: 'ExampleAvatar_C',
      cost: 400,
      itemType: 'model',
      resource:
        'https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/ExampleAvatar_C.vrm',
    },
    {
      upsert: true,
      new: true,
    }
  )
}

router.get('', async (req: Request, res: Response) => {
  const shopItems = await Shop.find().lean().exec()
  return res.status(200).send(updateShopArrayObject(shopItems))
})

router.get('/:itemType', async (req: Request, res: Response) => {
  const { itemType } = req.params
  const shopItems = await Shop.find({
    itemType: itemType,
  })
    .lean()
    .exec()
  return res.status(200).send(updateShopArrayObject(shopItems))
})

export { router }
