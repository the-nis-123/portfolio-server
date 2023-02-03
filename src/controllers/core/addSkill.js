const Skill = require('../../models/Skill');

module.exports = async (req, res) => {
  try{
    let file;

    let filesObject = req?.files || null;
    file = filesObject?.files? filesObject.files[0].filename : "";

    const response = await Skill({...req.body, file}).save();
    
    console.log(response);
    return res.status(200).json(response);
  }catch(err){
    req.err = err;
    console.error(err);
    return res.status(500).json({message: 'Something went wrong'});
  }
}