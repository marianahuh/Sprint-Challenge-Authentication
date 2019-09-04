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
        res.status(401).json({ message: 'Error verifying token', error: err });
      } else {
        // decodedToken
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ message: 'Invalid scheme, or no token after scheme name.' });
  }
};
