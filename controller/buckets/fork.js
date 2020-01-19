/* eslint-disable object-curly-newline */
/* eslint-disable arrow-parens */
const { bucketlist } = require('../../models');
const { isValid } = require('../../utils/tokenhelper');

module.exports = {
  post: (req, res) => {
    let userId;
    const { token } = req.cookies;
    if (token) {
      // 여기 비동기적으로 될까? -> 토큰헬퍼 리펙토링 되는지..
      isValid(token, validToken => {
        userId = validToken.userInfo.id;
      });
    }

    const { title, image, content, expectedDate } = req.body;

    bucketlist
      .create({
        title,
        image,
        content,
        likeCount: 0,
        expectedDate,
        user_id: userId,
      })
      .then(() => res.send(200).send('ok'))
      .catch(err => {
        console.log(err);
        res.status(404).send(err);
      });
  },
};
