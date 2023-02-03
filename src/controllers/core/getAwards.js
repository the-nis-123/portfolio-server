const Award = require('../../models/Award');

module.exports = async (req, res) => {
  try{
    const response = await Award.find();
    return res.status(200).json(response);
  }catch(err){
    req.err = err;
    return res.status(500).json({message: 'Something went wrong'});
  }
}