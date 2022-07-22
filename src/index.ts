import { User } from './model'

const main = async () => {
  await User.create({
    name: 'Bob',
  })
}
main()
