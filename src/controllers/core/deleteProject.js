const Project = require('../../models/Project');

module.exports = async (req, res) => {
  try{
    const response = await Project.deleteOne({_id: req.params.id});
    return res.status(200).json(response);
  }catch(err){
    req.err = err;
    return res.status(500).json({message: 'Something went wrong'});
  }
}