import express, { Request, Response } from 'express'
import { leaderboardRouter, userRouter, shopRouter } from './routes'
import morgan from 'morgan'
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT

const app = express()
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

process.on('uncaughtException', (error) => {
  console.log('an error caught', error)
})

app.get('/', async (req: Request, res: Response) => {
  return res.status(200).send('Hello :)')
})
app.use('/leaderboard', leaderboardRouter)
app.use('/user', userRouter)
app.use('/shop', shopRouter)

app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})
