const cors = require('cors')

const ACCEPTED_ORIGINS = [
  'https://calcagni-gabriel.vercel.app',
  'https://neo-wifi.vercel.app',
  'https://double-commit.vercel.app',
  'http://localhost:3000'
]

const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
 return cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true)
      }
      if (!acceptedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS: 🐶'))
    },
  })
}

module.exports = corsMiddleware 