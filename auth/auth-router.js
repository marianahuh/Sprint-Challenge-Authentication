const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

const Users = require('../users/usersModel.js');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// router.delete('/logout', (req, res) => {
//   if (req.session) {
//     console.log(req.session);
//     req.session.destroy(err => {
//       if (err) {
//         res.status(400).send('unable to logout...');
//       } else {
//         res.send('You have logged out successfully');
//       }
//     });
//   } else {
//     res.end();
//   }
// });

function genToken(user) {
  const payload = {
    subject: 'user',
    username: user.username
  };
  const secret = secrets.jwtSecret;

  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
