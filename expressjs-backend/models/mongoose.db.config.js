const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.set('debug', true);

async function connectMongoDB() {
  await mongoose
    .connect(
      'mongodb+srv://' +
        process.env.MONGO_USER +
        ':' +
        process.env.MONGO_PWD +
        '@' +
        process.env.MONGO_CLUSTER +
        '/' +
        process.env.MONGO_DB +
        '?retryWrites=true&w=majority',
      {
        useNewUrlParser: true, //useFindAndModify: false,
        useUnifiedTopology: true
      }
    )
    .catch((error) => console.log(error));
}

module.exports = connectMongoDB;
