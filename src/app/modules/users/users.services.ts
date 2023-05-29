import { IUser } from './users.interface'
import User from './users.model'

const createdUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated id
  // default password

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('Failed to create user!')
  }
  return createdUser
}

export default {
  createdUser,
}
