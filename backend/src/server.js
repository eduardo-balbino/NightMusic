import express from 'express'
import 'dotenv/config'
import musicRouter from './routes/musics.routes.js'

import { logger } from './middlewares/logger.middlewares.js'
import { errorHandler } from './middlewares/error.middlewares.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(logger)

app.use(express.json())
app.use('/musics', musicRouter)

app.get('/health', (req, res) => {
  res.status(200).send('ok')
})

app.get('/api/error-test', (req, res) => {
  throw new Error('Test error')
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})