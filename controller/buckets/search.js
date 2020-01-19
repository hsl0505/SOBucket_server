/* eslint-disable array-callback-return */
/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
const { bucketlist, Op, users, likes } = require('../../models');
const { isValid } = require('../../utils/tokenhelper');

module.exports = {
  get: (req, res) => {
    const { q } = req.query;
    const { token } = req.cookies;
    const result = { searchBuckets: [] };

    let userId = null;

    if (token) {
      isValid(token, validToken => {
        userId = validToken.userInfo.id;
      });
    }

    bucketlist
      .findAll({
        include: [users],
        where: {
          title: {
            [Op.like]: `%${q}%`,
          },
        },
      })
      .then(data => {
        data.map(ele => {
          const obj = {};
          obj.id = ele.id;
          obj.title = ele.title;
          obj.content = ele.content;
          obj.image = ele.image;
          obj.userNickName = ele.userNickName;
          obj.expectedDate = ele.expectedDate;
          obj.createdAt = ele.createdAt;
          obj.likeCount = ele.likeCount;
          obj.mylike = false;

          if (userId) {
            likes.findOne({ where: { bucket_id: ele.id } }).then(likedata => {
              if (likedata.user_id === userId) {
                obj.mylike = true;
              }
              result.searchBuckets.push(obj);
            });
          } else {
            result.searchBuckets.push(obj);
          }
        });
      })
      .then(() => {
        res.send(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.send(404).send(err);
      });
  },
};
