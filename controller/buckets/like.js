const { bucketlist, likes, Sequelize } = require('../../models');
const { isValid } = require('../../utils/tokenhelper');

module.exports = {
  post: (req, res) => {
    let userId;
    const { token } = req.cookies;
    if (token) {
      isValid(token, validToken => {
        userId = validToken.userInfo.id;
      });
    }
    const { isLike, bucketId } = req.body;

    if (isLike) {
      likes
        .create({
          user_id: userId,
          bucket_id: bucketId,
        })
        .then(() =>
          bucketlist
            .update(
              { likeCount: Sequelize.literal('likeCount + 1') },
              { where: { id: bucketId } },
            )
            .then(() => res.send(200).send('ok')),
        );
    } else {
      likes
        .destroy({ where: { user_id: userId } })
        .then(() =>
          bucketlist
            .update(
              { likeCount: Sequelize.literal('likeCount - 1') },
              { where: { id: bucketId } },
            )
            .then(() => res.send(200).send('ok')),
        );
    }
  },
};
