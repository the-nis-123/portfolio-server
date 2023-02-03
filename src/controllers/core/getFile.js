const mongoose = require('mongoose');
const GridStream = require('gridfs-stream');

const connection = mongoose.connection;
let gfs, gridfsBucket;

connection.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: 'uploads'});
  gfs = GridStream(connection.db, mongoose.mongo);
  gfs.collection('uploads');
})

module.exports = async (req, res) => {
  try{
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
      err && res.status(500).json({message: "Internal server error"});

      if (!file || file.length === 0) {
        return res.status(404).json({ message: 'Not found'});
      }

      const readstream = gridfsBucket.openDownloadStreamByName(req.params.filename);
      readstream.pipe(res);
    })
  }catch(err){
    req.err = err;
    return  res.status(500).json({message: 'Something went wrong'});
  }
}