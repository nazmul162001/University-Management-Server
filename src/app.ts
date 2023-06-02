import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersServices from './app/modules/users/users.services'
import userRouter from './app/modules/users/users.route'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes

app.use('/api/v1/users/', userRouter)

app.get('/', async (req: Request, res: Response) => {
  await usersServices.createdUser({
    id: '989',
    password: '1534',
    role: 'teacher',
  })
  res.send('Working Successfully!')
})

export default app
