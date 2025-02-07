const cors = require('cors')

const ACCEPTED_ORIGINS = [
  'https://calcagni-gabriel.vercel.app',
  'https://neo-wifi.vercel.app',
  'https://double-commit.vercel.app',
  'http://localhost:5173/'
]

const corsMiddleware = ({ aceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
 return cors({
    origin: (origin, callback) => {
      if (aceptedOrigins.includes(origin)) {
        return callback(null, true)
      }

      if (!origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
  })
}

module.exports = corsMiddleware 