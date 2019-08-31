/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // bad token
        res.status(401).json({ message: 'error verifying token', error: err });
      } else {
        // decodedToken
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ message: 'invalid scheme, or no token after scheme name.' });
  }
};
