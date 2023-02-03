const Skill = require('../../models/Skill');

module.exports = async (req, res) => {
  console.log(req.body);

  try{
    let file, newData;

    let filesObject = req?.files || null;
    file = filesObject?.files? filesObject.files[0].filename : "";

    file && await Project.updateOne({_id: req.params.id}, {...newData, file});
    !file && await Project.updateOne({_id: req.params.id}, {...newData});
    return res.sendStatus(200);

  }catch(err){
    req.err = err;
    return res.status(500).json({message: 'Something went wrong'});
  }
}