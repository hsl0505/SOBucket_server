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
        // console.log('findAll result : ', Array.isArray(result), result);
        const target = req.params.id;
        console.log('target : ', typeof target);
        for (let i = 0; i < result.length; i++) {
          console.log(
            'result[i].dataValues.id : ',
            typeof result[i].dataValues.id,
          );
          if (String(result[i].dataValues.id) === target) {
            return res.status(200).json(result[i].dataValues);
          }
        }
        res.sendStatus(404);
      })
      .catch(err => res.sendStatus(400));
  },
};
