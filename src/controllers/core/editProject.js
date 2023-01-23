const Project = require('../../models/Project');

module.exports = async (req, res) => {
  console.log(req.body);

  try{
    let files, newData;

    let filesObject = req?.files || null;
    files = filesObject?.files? filesObject.files.map(file => file.filename) : [];

    const response = await Project.updateOne({_id: req.params.id},
      {...newData, $addToSet: {  files: files.forEach(element => element)}}
    );
    
    console.log(response);
    return res.status(200).json(response);
  }catch(err){
    req.err = err;
    console.error(err);
    return res.status(500).json({message: 'Something went wrong'});
  }
}