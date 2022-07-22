import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const aatMongoose = mongoose.createConnection(
  'mongodb+srv://user:rom8AbmlHiWF6Twk@cluster0.3otfo.mongodb.net/aat',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
)

aatMongoose.once('open', () => {
  console.log('Connected to MongoDB')
})

export { aatMongoose }
