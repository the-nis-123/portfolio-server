const bcrypt = require('bcrypt');
const Biography = require('../../models/Biography');

module.exports = async (req, res) => {

  try{
    let {email, password, ...userData} = req.body;
    const saltRounds = 17;
    const salt = await bcrypt.genSalt(saltRounds);
    password = await bcrypt.hash(password, salt);
    email = await bcrypt.hash(email, salt);
    const response = await Biography({password, email, ...userData}).save();
    return res.json(response);

  }catch(err){
    req.err = err;
    return res.status(500).json({message: 'Something went wrong'});
  }
}