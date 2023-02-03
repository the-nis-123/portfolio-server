const Skill = require('../../models/Skill');

module.exports = async (req, res) => {
  try{
    const response = await Skill.find();
    console.log(response);
    return res.status(200).json(response);
  }catch(err){
    req.err = err;
    console.error(err);
    return res.status(500).json({message: 'Something went wrong'});
  }
}