import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersServices from './app/modules/users/users.services'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req: Request, res: Response) => {
  await usersServices.createdUser({
    id: '989',
    password: '1534',
    role: 'teacher',
  })
  res.send('Working Successfully!')
})

export default app
