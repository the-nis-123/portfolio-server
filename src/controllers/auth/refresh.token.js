const User = require('../../models/Biography');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

  const foundUser = await User.findOne({ refreshToken });

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      async (err, decoded) => {
        if (err) return res.sendStatus(403); //Forbidden
        console.log('attempted refresh token reuse!')
        const hackedUser = await User.findOne({ _id: decoded.id });
        hackedUser.refreshToken = [];
        const result = await hackedUser.save();
      }
    )

    return res.sendStatus(403); //Forbidden
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

  // evaluate jwt 
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    async (err, decoded) => {
      if (err) {
        foundUser.refreshToken = [...newRefreshTokenArray];
        const result = await foundUser.save();
      }
      if (err || foundUser._id !== decoded.id) return res.sendStatus(403);

      // Refresh token was still valid
      const accessToken = jwt.sign(
        {
          "name": foundUser.name,
          "location": foundUser.location,
          "avatar": foundUser.avatar,
          "id": foundUser._id
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '5m' }
      );

      const newRefreshToken = jwt.sign(
        {
          "name": foundUser.name,
          "location": foundUser.location,
          "avatar": foundUser.avatar
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: '1d' }
      );
      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await foundUser.save();

      // Creates Secure Cookie with refresh token
      res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

      res.json({ accessToken })
    }
  );
}
