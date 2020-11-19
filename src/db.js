const mongoose = require('mongoose');

module.exports = {
  connect: DB_HOST => {
    //use the Mongo driver's update URL strong parser
    mongoose.set('useNewUrlParser', true);

    //use findOneandUpdate() in place of findAndModify()
    mongoose.set('useFindAndModify', false);

    //use createIndex() in place of ensureIndex()
    mongoose.set('useCreateIndex', true);

    //use the new server discovery and monitoring engine
    mongoose.set('useUnifiedTopology', true);

    //Connect to the DB
    mongoose.connect(DB_HOST);

    //Log an error if we fail to connect
    mongoose.connection.on('error', err => {
      console.log(err);
      console.log(
        'MongoDB connection error. Make sure MongoDB is running and check connectin info.'
      );
      process.exit();
    });
  },

  close: () => {
    mongoose.connection.close();
  }
};
