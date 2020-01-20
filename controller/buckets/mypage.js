const { bucketlists } = require('../../models');

const { isValid } = require('../../utils/tokenhelper');

module.exports = {
  get: (req, res) => {
    const { token } = req.cookies;
    let userId = 'no_user_id';
    if (token) {
      isValid(token, validToken => {
        userId = validToken.userInfo.id;
      });
    }
    bucketlists
      .findAll({
        where: { user_id: userId },
      })
      .then(result => {
        res.status(200).json({ bucketlists: result });
      })
      .catch(err => res.sendStatus(400));
  },
};
