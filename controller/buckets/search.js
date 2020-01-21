/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
const { bucketlists, Op, users, likes } = require('../../models');
const { isValid } = require('../../utils/tokenhelper');

module.exports = {
  get: (req, res) => {
    console.log(req.cookies);
    const { q } = req.query;
    const { token } = req.cookies;
    const result = { searchBuckets: [] };

    let userId = null;

    if (token) {
      isValid(token, validToken => {
        userId = validToken.userInfo.id;
      });
    }

    bucketlists
      .findAll({
        where: {
          title: {
            [Op.like]: `%${q}%`,
          },
        },
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
          result.searchBuckets.push(obj);
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
