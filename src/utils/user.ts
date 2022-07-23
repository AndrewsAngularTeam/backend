import { User } from '../models'

const createUser = async (id: string, name: string) => {
  const user = await User.create({
    name: name,
    id: id,
  })
  return user
}

const checkUserExist = async (userId: string | undefined) => {
  if (userId === undefined) {
    return null
  }
  const check = await User.findOne({
    id: userId,
  })
    .select('')
    .lean()
    .exec()

  return check
}

export { checkUserExist, createUser }
