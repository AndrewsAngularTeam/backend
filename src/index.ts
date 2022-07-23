import express, { Request, Response } from 'express'
import { leaderboardRouter } from './routes'
import morgan from 'morgan'
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT

const app = express()
app.use(morgan('tiny'))
app.use(cors())

app.get('/', async (req: Request, res: Response) => {
  return res.status(200).send('Hello :)')
})
app.use('/leaderboard', leaderboardRouter)

app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})
