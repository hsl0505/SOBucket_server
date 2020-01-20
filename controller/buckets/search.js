/* eslint-disable array-callback-return */
/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
const { bucketlists, Op, users, likes } = require('../../models');
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

    bucketlists
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
          obj.id = ele.id; // 버킷 아이디
          obj.title = ele.title; // 버킷 타이틀
          obj.content = ele.content; // 버킷 내용
          obj.image = ele.image; // 버킷 이미지
          obj.userNickName = ele.user.userNickName; // 유저 닉네임
          obj.expectedDate = ele.expectedDate; // 버킷 예상일자
          obj.createdAt = ele.createdAt; // 버킷 생성일
          obj.likeCount = ele.likeCount; // 버킷 좋아요수
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
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(404).send(err);
      });
  },
};
