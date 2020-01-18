/* eslint-disable import/no-unresolved */
/* eslint-disable array-callback-return */
/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
const { bucketlists, Sequelize, users, likes } = require('../../models');
const { isValid } = require('../../utils/tokenhelper');

module.exports = {
  get: (req, res) => {
    // 로그인 안되어있는 상태
    const { token } = req.cookies;

    const result = { bucketlist: [] };

    let userId = null;

    if (token) {
      isValid(token, validToken => {
        userId = validToken.userInfo.id;
      });
    }

    bucketlists
      .findAll({
        order: Sequelize.random(),
        limit: 8,
        include: [users],
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
              result.bucketlist.push(obj);
            });
          } else {
            result.bucketlist.push(obj);
          }
        });
      })
      .then(() => {
        res.send(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(404).send(err);
      });
  },
};
