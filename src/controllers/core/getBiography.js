const Biography = require('../../models/Biography');

module.exports = async (req, res) => {
  try{
    const response = await Biography.find().select({email:0, password:0, contact:0});
    console.log(response[0]);
    return res.status(200).json(response[0]);
  }catch(err){
    req.err = err;
    console.error(err);
    return res.status(500).json({message: 'Something went wrong'});
  }
}