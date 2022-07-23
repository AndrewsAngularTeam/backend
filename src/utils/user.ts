import { User } from '../models'

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

export { checkUserExist }
