const { bucketlists, users, likes } = require('../../models');

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

    const resObj = { bucketlists: [] };

    bucketlists
      .findAll({
        include: [
          { model: users, attributes: ['userNickName', 'avatar'] },
          { model: likes, attributes: ['user_id'] },
        ],
        where: { user_id: userId },
      })
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          const obj = data[i].dataValues;
          obj.mylike = false;
          for (let j = 0; j < data[i].likes.length; j++) {
            if (data[i].likes[j].user_id === userId) {
              obj.mylike = true;
              break;
            }
          }
          resObj.bucketlists.push(obj);
        }
      })
      .then(() => {
        res.status(200).json(resObj);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      });
  },
};
