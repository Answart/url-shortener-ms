const mongoose = require('mongoose');


module.exports = (uri) => {
  mongoose.connect(uri, { useNewUrlParser: true });

  mongoose.connection.once('open', () => console.log('Connected to MongoDB!\n'));

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
  });

  return mongoose;
};
