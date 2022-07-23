const ADD_DUMMY_SHOP_URL = true
const dummyImageUrl =
  'https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/Toujou.Nozomi.full.2855505.png'

const deleteObjectId = (object: any) => {
  if (object['_id'] !== undefined) {
    object['id'] = object['_id']
    delete object['_id']
  }
  return object
}

const objectIdToId = (object: any) => {
  if (Array.isArray(object)) {
    object.forEach((o) => {
      deleteObjectId(o)
    })
  } else if (object['_id'] !== undefined) {
    deleteObjectId(object)
  }
  return object
}

const addDummyUrlToArray = (object: Array<any>) => {
  object.forEach((o) => {
    if (o['image'] === undefined) {
      o['image'] = dummyImageUrl
    }
  })
  return object
}

const updateShopArrayObject = (object: Array<any>) => {
  object = objectIdToId(object)
  if (ADD_DUMMY_SHOP_URL) {
    object = addDummyUrlToArray(object)
  }
  return object
}

export { updateShopArrayObject }
