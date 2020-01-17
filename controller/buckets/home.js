/* eslint-disable import/no-unresolved */
/* eslint-disable array-callback-return */
/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
const { bucketlists, Sequelize, users, likes } = require('../../models');

module.exports = {
  get: (req, res) => {
    const result = { bucketlist: [] };

    bucketlists
      .findAll({
        order: Sequelize.literal('rand()'),
        limit: 1,
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

          likes
            .findAndCountAll({
              include: [bucketlists],
              where: {
                bucket_id: ele.id,
              },
            })
            .then(likeData => {
              obj.likes = likeData.count;
              result.bucketlist.push(obj);
            });
        });
      })
      .then(() => {
        res.send(200).json(result);
      });
  },
};
