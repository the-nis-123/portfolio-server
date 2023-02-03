const Project = require('../../models/Project');

module.exports = async (req, res) => {

  try{
    let file;

    let filesObject = req?.files || null;
    file = filesObject?.files? filesObject.files[0].filename : "";
    const response = await Project({...req.body, file}).save();
    
    return res.status(200).json(response);
    
  }catch(err){
    req.err = err;
    return res.status(500).json({message: 'Something went wrong'});
  }
}