const jwt = require('jsonwebtoken');

require('dotenv').config();

const TOKEN_SECRET = process.env.T_TOKEN_SECRET;

const tokenGenerator = (data, callback) => {
  jwt.sign(
    data,
    TOKEN_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: 1000 * 60 * 60 * 24,
    },
    (err, token) => {
      if (err) {
        console.error(err);
      } else {
        callback(token);
      }
    },
  );
};

const isValid = (token, callback) => {
  jwt.verify(token, TOKEN_SECRET, (err, decode) => {
    if (err) {
      callback({ isValid: false });
    } else {
      const exp = new Date(decode.exp * 1000);
      const now = Date.now();
      // const day = 1000 * 60 * 60 * 24;
      if (exp < now) {
        callback({ isValid: false });
        // } else if (exp < now + 5 * day) {
        //   // console.log("=========Token Helper: Generate New Token")
        //   const newToken = module.exports.generateToken(decode.user.id);
        //   callback({ isValid: true, token: newToken, userInfo: decode });
      } else {
        // console.log("=========Token Helper: Token is valid")
        callback({ isValid: true, token: token, userInfo: decode });
      }
    }
  });
};

const tokenHandler = (req, res, next) => {
  const { token } = req.query;

  if (token) {
    module.exports.isValid(token, result => {
      req.userInfo = result;
      next();
    });
  } else {
    req.userInfo = { isValid: false };
    next();
  }
};

module.exports = {
  tokenGenerator,
  isValid,
  tokenHandler,
};
