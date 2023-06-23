import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'
import notFoundRoute from './app/routes/notFoundRoute'
import { sendWelcomeRouteResponse } from './shared/sendWelcomeRouteResponse'
import cookieParser from 'cookie-parser'
const app: Application = express()

app.use(cors())
app.use(cookieParser())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Welcome Route
app.get('/', async (req: Request, res: Response) => {
  const responseData = {
    message: 'Welcome to the Server',
    data: null,
  }
  sendWelcomeRouteResponse(res, responseData)
})
// application routes
app.use('/api/v1', routes)
//global error handler
app.use(globalErrorHandler)

// handle not found route
app.use(notFoundRoute)

export default app
