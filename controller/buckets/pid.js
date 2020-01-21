const { bucketlists, users, comments, likes } = require('../../models');

module.exports = {
  get: (req, res) => {
    let resObj;
    bucketlists
      .findOne({
        include: [{ model: users, attributes: ['userNickName', 'avatar'] }],
        where: {
          id: req.params.id,
        },
      })
      .then(result => {
        // console.log(result.dataValues);
        resObj = result.dataValues;
        comments
          .findAll({
            include: [{ model: users, attributes: ['userNickName', 'avatar'] }],
            where: {
              bucket_id: req.params.id,
            },
          })
          .then(comment => {
            // console.log(comment[0]);
            const commentsByBucketId = comment.map(ele => ele.dataValues);
            console.log('commentsByBucketId : ', commentsByBucketId);
            resObj.comments = commentsByBucketId;
            res.status(200).json(resObj);
          });
      })
      .catch(err => {
        console.log(err);
        res.status(404).send(err);
      });
  },
};
