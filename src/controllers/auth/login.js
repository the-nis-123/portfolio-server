const User = require('../../models/Biography');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  try {
    const cookies = req.cookies;
    const { email, password } = req.body;

    console.log(email, password);
    
    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    //since we have just one user, the portifolio onwer, our auth flow is a little different
    //from the normal flow

    //we fetch th user, on a login attempt
    const foundUser = await User.find();

    //for an additional protection layer, we encrypted both email and password
    //so we need to verify both email and password, in order to successfully login
    //the email could be any string as long as you remember it, 
    //not necessarily your public email

    const validPassword = await bcrypt.compare(password, foundUser.password);
    const validEmail = await bcrypt.compare(email, foundUser.email);

    if (validPassword && validEmail) {
      // create JWTs
      const accessToken = jwt.sign(
        {
          "name": foundUser.name,
          "location": foundUser.location,
          "id": foundUser._id,
          "avatar": foundUser.avatar
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '5m' }
      );
          
      const newRefreshToken = jwt.sign(
          {
            "name": foundUser.name,
            "location": foundUser.location,
            "id": foundUser._id,
            "avatar": foundUser.avatar
          },
          process.env.REFRESH_TOKEN_SECRET_KEY,
          { expiresIn: '1d' }
      );

      // Changed to let keyword
      let newRefreshTokenArray =
          !cookies?.jwt
              ? foundUser.refreshToken
              : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

      if (cookies?.jwt) {

        /* 
        Scenario added here: 
            1) User logs in but never uses RT and does not logout 
            2) RT is stolen
            3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
        */
        const refreshToken = cookies.jwt;
        const foundToken = await User.findOne({ refreshToken });

        // Detected refresh token reuse!
        if (!foundToken) {
          // clear out ALL previous refresh tokens
          newRefreshTokenArray = [];
        }

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      }
  
      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await foundUser.save();

      // Creates Secure Cookie with refresh token
      res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
      // Send authorization roles and access token to user
      res.status(200).json({ accessToken });

    } else {
        res.sendStatus(401);
    }
  } catch (err) {
    req.error = err;
    console.log(err);
    res.status(500).json({message: 'internal server error'});
  }
}
