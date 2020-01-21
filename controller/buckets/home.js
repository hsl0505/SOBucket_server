/* eslint-disable no-plusplus */
/* eslint-disable operator-linebreak */
/* eslint-disable import/no-unresolved */
/* eslint-disable array-callback-return */
/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
const { bucketlists, users, likes, sequelize } = require('../../models');
const { isValid } = require('../../utils/tokenhelper');

module.exports = {
  get: (req, res) => {
    const { token } = req.cookies;
    const result = { bucketList: [] };
    let userId = null;

    if (token) {
      isValid(token, validToken => {
        userId = validToken.userInfo.id;
      });
    }

    console.log(userId);

    bucketlists
      .findAll({
        order: sequelize.random(),
        include: [
          { model: users, attributes: ['userNickName', 'userNickName'] },
          { model: likes, attributes: ['user_id'] },
        ],
        attributes: [
          'id',
          'title',
          'content',
          'image',
          'expectedDate',
          'createdAt',
          'likeCount',
        ],
        limit: 8,
      })
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          const obj = {
            id: data[i].id,
            title: data[i].title,
            content: data[i].content,
            image: data[i].image,
            expectedDate: data[i].expectedDate,
            createdAt: data[i].createdAt,
            likeCount: data[i].likeCount,
            userNickName: data[i].user.userNickName,
            mylike: false,
          };
          for (let j = 0; j < data[i].likes.length; j++) {
            if (data[i].likes[j].user_id === userId) {
              obj.mylike = true;
              break;
            }
          }
          result.bucketList.push(obj);
        }
      })
      .then(() => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(404).send(err);
      });
  },
};
