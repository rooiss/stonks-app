import * as mongoose from 'mongoose'

export const connectdb = () => {
  mongoose.connect('mongodb://mongodb:27017/Stonks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    // TODO: use .env file
    // user: 'root',
    // pass: '1234',
  })
}
