import { NextFunction, Request, Response } from 'express'
import usersServices from './users.services'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { users } = req.body
    const result = await usersServices.createdUser(users)
    res.status(200).json({
      success: true,
      message: 'Successfully Created User',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export default {
  createUser,
}
