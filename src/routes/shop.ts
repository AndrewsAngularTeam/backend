import express, { Request, Response } from 'express'
import { Shop, User } from '../models'
import { updateShopArrayObject } from '../utils/objectIdToId'
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

const router = express.Router()

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

router.post('/purchaseItem', async (req: Request, res: Response) => {
  const { itemId, userId } = req.body

  if (itemId == null || userId == null) {
    return res
      .status(400)
      .send('itemId or userId does not exist in the request body.')
  }

  // Check if the item exist
  const itemObj = await Shop.findOne({
    _id: new ObjectId(itemId),
  })
    .lean()
    .exec()
  if (itemObj == null) {
    return res.status(400).send('The item does not exist.')
  }
  const coinCost = itemObj.cost

  const userObj = await User.findOne({ id: userId }).lean().exec()
  if (userObj == null) {
    return res.status(400).send('The user does not exist.')
  }

  if (userObj.coins < coinCost) {
    return res.status(400).send('The user does not have enough coins.')
  }

  if (userObj.ownedItemIds.includes(itemId)) {
    return res.status(400).send('The user already own this item.')
  }

  const itemType = itemObj.itemType

  const updatedUserObj = await User.findOneAndUpdate(
    { id: userId },
    {
      $push: {
        ownedItemIds: itemId,
      },
      $set: {
        [`selectedItemIds.${itemType}`]: itemId,
      },
      $inc: {
        coins: -coinCost,
      },
    },
    {
      new: true,
    }
  )
    .lean()
    .exec()

  return res.status(200).json(updatedUserObj)
})

export { router }
