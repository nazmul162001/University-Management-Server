import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/user/user.route'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes

app.use('/api/v1/users/', UserRoutes)

// app.get('/', async (req: Request, res: Response) => {
//   await usersServices.createdUser({
//     id: '989',
//     password: '1534',
//     role: 'teacher',
//   })
//   res.send('Working Successfully!')
// })

// testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // Promise.reject(new Error('Unhandled Promise Rejection'))
//   console.log(x)
// })

app.use(globalErrorHandler)

export default app
