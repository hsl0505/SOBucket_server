/* eslint-disable import/no-unresolved */
/* eslint-disable array-callback-return */
/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
const { bucketlists, users, likes, sequelize } = require('../../models');
const { isValid } = require('../../utils/tokenhelper');

module.exports = {
  get: (req, res) => {
    // 로그인 안되어있는 상태
    const { token } = req.cookies;

    const result = { bucketList: [] };

    let userId = null;

    if (token) {
      isValid(token, validToken => {
        userId = validToken.userInfo.id;
      });
    }

    bucketlists
      .findAll({
        order: sequelize.random(),
        limit: 8,
        include: [users],
      })
      .then(data => {
        data.map(ele => {
          const obj = {};
          obj.id = ele.id; // 버킷 id
          obj.title = ele.title; // 버킷 타이틀
          obj.content = ele.content; // 버킷 내용
          obj.image = ele.image; // 버킷 이미지
          obj.userNickName = ele.user.userNickName; // 유저 닉네임
          obj.expectedDate = ele.expectedDate; // 버킷 완료날짜
          obj.createdAt = ele.createdAt; // 버킷 만들어진 시간
          obj.likeCount = ele.likeCount; // 버킷의 좋아요
          obj.mylike = false; // 내가 과거에 좋아요 눌렀는가

          if (userId) {
            likes.findOne({ where: { bucket_id: ele.id } }).then(likedata => {
              if (likedata.user_id === userId) {
                obj.mylike = true;
              }
              result.bucketList.push(obj);
            });
          } else {
            result.bucketList.push(obj);
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
