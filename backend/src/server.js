import express from 'express'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3000

app.get('/health', (req, res) => {
  res.status(200).send('ok')
})

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})