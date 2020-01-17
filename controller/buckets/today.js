/* eslint-disable array-callback-return */
/* eslint-disable arrow-parens */
const { bucketlist, users } = require('../../models');

module.exports = {
  get: (req, res) => {
    const result = { todayBucketList: [] };

    bucketlist
      .findAll({
        include: [users],
        order: ['likeCount', 'DESC'],
        limit: 4,
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
          result.todayBucketList.push(obj);
        });
      })
      .then(() => {
        res.send(200).json(result);
      });
  },
};
