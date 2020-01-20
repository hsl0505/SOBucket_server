const { users } = require('../../models');
const { tokenGenerator } = require('../../utils/tokenhelper');

module.exports = {
  post: (req, res) => {
    users
      .findOne({
        where: { email: req.body.email, password: req.body.password },
      })
      .then(result => {
        if (result) {
          tokenGenerator(
            {
              id: result.id,
              userNickName: result.userNickName,
            },
            token => {
              console.log('token generate normally');
              res.cookie('token', token);
              return res.status(200).json({ id: result.id });
            },
          );
        } else {
          return res.status(404).send('invalid user');
        }
      })
      .catch(err => {
        if (err) {
          console.log(err);
          res.status(404).send(err);
        }
      });
  },
};
