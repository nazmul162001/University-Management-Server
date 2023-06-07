import express, { Application } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes

app.use('/api/v1/users/', userRouter)

// app.get('/', async (req: Request, res: Response) => {
//   await usersServices.createdUser({
//     id: '989',
//     password: '1534',
//     role: 'teacher',
//   })
//   res.send('Working Successfully!')
// })

//testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // throw new ApiError(400, 'Server got Error')
//   next('server got error')
// })

app.use(globalErrorHandler)

export default app
