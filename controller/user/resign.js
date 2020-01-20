const { users } = require('../../models');

const { isValid } = require('../../utils/tokenhelper');

module.exports = {
  post: (req, res) => {
    const { token } = req.cookies;
    let userId = '';
    isValid(token, validToken => {
      userId = validToken.userInfo.id;
    });
    users.destroy({ where: { id: userId } });
    res.clearCookie('token');
    res.redirect(200, '/');
  },
};
