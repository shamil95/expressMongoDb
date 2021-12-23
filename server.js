const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path: './.env'})

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(connect => {
  console.log('Db is Connected')
})

const port = process.env.PORT || 3007;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})