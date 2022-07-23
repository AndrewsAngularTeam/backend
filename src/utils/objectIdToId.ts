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

export { objectIdToId }
