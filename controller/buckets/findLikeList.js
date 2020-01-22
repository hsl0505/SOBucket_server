/* eslint-disable no-plusplus */
/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
const { bucketlists, users, likes, Op } = require('../../models');
const { isValid } = require('../../utils/tokenhelper');

module.exports = {
  get: (req, res) => {
    const { token } = req.cookies;

    let userId = null;

    if (token) {
      isValid(token, validToken => {
        userId = validToken.userInfo.id;
      });
    }

    const result = { likeList: [] };

    bucketlists
      .findAll({
        where: { user_id: { [Op.not]: userId } },
        include: [
          { model: likes, attributes: ['user_id'], where: { user_id: userId } },
          { model: users, attributes: ['userNickName', 'avatar'] },
        ],
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
          result.likeList.push(obj);
        }
      })
      .then(() => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      });
  },
};
