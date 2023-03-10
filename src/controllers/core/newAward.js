const Award = require('../../models/Award');

module.exports = async (req, res) => {
  console.log(req.body);

  try{
    let files;

    let filesObject = req?.files || null;
    files = filesObject?.files? filesObject.files.map(file => file.filename) : [];

    const response = await Award({...req.body, files}).save();
    
    return res.status(200).json(response);
  }catch(err){
    req.err = err;
    return res.status(500).json({message: 'Something went wrong'});
  }
}