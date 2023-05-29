import { Request, Response } from 'express'
import usersServices from './users.services'

const createUser = async (req: Request, res: Response) => {
  try {
    const { users } = req.body
    const result = await usersServices.createdUser(users)
    res.status(200).json({
      success: true,
      message: 'Successfully Created User',
      data: result,
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Failed to create user',
    })
  }
}

export default {
  createUser,
}
