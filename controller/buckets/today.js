/* eslint-disable array-callback-return */
/* eslint-disable arrow-parens */
const { bucketlists, users } = require('../../models');

module.exports = {
  get: (req, res) => {
    const result = { todayBucketList: [] };

    bucketlists
      .findAll({
        include: [users],
        order: [['likeCount', 'DESC']],
        limit: 4,
      })
      .then(data => {
        data.map(ele => {
          const obj = {};
          obj.id = ele.id; // 버킷 아이디
          obj.title = ele.title; // 버킷 타이틀
          obj.content = ele.content; // 버킷 내용
          obj.image = ele.image; // 버킷 이미지
          obj.userNickName = ele.user.userNickName; // 유저 닉네임
          obj.expectedDate = ele.expectedDate; // 버킷 완료날짜
          obj.createdAt = ele.createdAt; // 버킷 생성일시
          obj.likeCount = ele.likeCount; // 버킷 좋아요숫자
          result.todayBucketList.push(obj);
        });
      })
      .then(() => {
        res.status(200).json(result);
      });
  },
};
