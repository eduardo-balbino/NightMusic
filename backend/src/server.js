import express from 'express'
import 'dotenv/config'
import userRouter from '../routes/user.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use("/users", userRouter)

app.get('/health', (req, res) => {
  res.status(200).send('ok')
})

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})