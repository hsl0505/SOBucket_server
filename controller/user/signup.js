const { users } = require('../../models');

module.exports = {
  post: (req, res) => {
    users
      .findOrCreate({
        where: {
          email: req.body.email,
        },
        defaults: {
          userName: req.body.userName,
          userNickName: req.body.userNickName,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          avatar: req.body.avatar,
          signupDate: new Date(),
          isBlack: false,
          blackReason: null,
          auth: false,
        },
      })
      .then(([result, created]) => {
        // console.log('created : ', created);
        if (!created) {
          return res.status(409).send('Already exists user');
        }
        console.log('created');
        // console.log('plain result : ', result);
        // console.log('get result : ', result.get({ plain: true }));
        return res.status(200).send('OK'); // Created
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500); // Server error
      });
  },
};
