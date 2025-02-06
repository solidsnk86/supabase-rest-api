const express = require('express')
const { rateLimit } = require('express-rate-limit')
require('dotenv').config()
const { createDataRouter } = require('./routes/data')
const corsMiddleware = require('../middleware/cors.js')

const createApp = () => {
  const app = express()

  app.use(express.json())
  app.disable('x-powered-by')
  app.use(corsMiddleware())

  const rateLimiter = rateLimit({
    limit: 300,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests',
  })

  app.use(rateLimiter)
  app.use('/supabase', createDataRouter())

  const PORT = process.env.PORT ?? 3639
  app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
  })
}

createApp()
