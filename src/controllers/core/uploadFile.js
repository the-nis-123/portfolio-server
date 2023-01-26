const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
const GridStream = require('gridfs-stream');

const mongoURI = process.env.DB_CONNECTION;
const connection = mongoose.connection;
let gfs;

//stream engine
connection.once('open', () => {
  gfs = GridStream(connection.db, mongoose.mongo);
  gfs.collection('uploads');
});

//storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buff) => {

        if(err) {
          req.err = err;
          console.log(err);
          return reject(err)
        };

        const filename = buff.toString('hex') + path.extname(file.originalname);
        const fileinfo = {filename, bucketName: 'uploads'};
        resolve(fileinfo);
      })
    })
  }
});

module.exports = multer({storage});



