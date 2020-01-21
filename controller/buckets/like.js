/* eslint-disable function-paren-newline */
/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */
const { bucketlists, likes, Sequelize } = require('../../models');
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

    // console.log('여긴 뭘까요', typeof userId);
    // console.log('쿠키', req.cookies);

    if (isLike) {
      likes
        .create({
          user_id: userId,
          bucket_id: bucketId,
        })
        .then(() =>
          bucketlists
            .update(
              { likeCount: Sequelize.literal('likeCount + 1') },
              { where: { id: bucketId } },
            )
            .then(() => res.status(200).send('ok')),
        );
    } else {
      likes
        .destroy({ where: { user_id: userId, bucket_id: bucketId } })
        .then(() =>
          bucketlists
            .update(
              { likeCount: Sequelize.literal('likeCount - 1') },
              { where: { id: bucketId } },
            )
            .then(() => res.status(200).send('ok')),
        );
    }
  },
};
