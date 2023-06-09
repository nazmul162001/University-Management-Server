import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', err => {
  errorLogger.error(err)
  process.exit(1)
})

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Connected to Mongo`)

    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`Server connection error: ${error}`)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

process.on('SIGTERN', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
