const Award = require('../../models/Award');

module.exports = async (req, res) => {
  try{
    const response = await Award.find();
    console.log(response);
    return res.status(200).json(response);
  }catch(err){
    req.err = err;
    console.error(err);
    return res.status(500).json({message: 'Something went wrong'});
  }
}