const mongoose = require('mongoose');
const GridStream = require('gridfs-stream');

const connection = mongoose.connection;
let gfs, gridfsBucket;

connection.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: 'productsFiles'});
  gfs = GridStream(connection.db, mongoose.mongo);
  gfs.collection('uploads');
})

module.exports = async (req, res, next) => {
  try{
    gfs.remove({filename: req.params.filename}, (err, gridSore) => {
      if(err){
        return res.status(500).json({message: "Failed"});
      }
    });

    next();
    
  }catch(err){
    req.err = err;
    console.error(err);
    return res.status(500).json({message: 'Something went wrong'});
  }
}