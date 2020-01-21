/* eslint-disable object-curly-newline */
/* eslint-disable arrow-parens */
const { bucketlists } = require('../../models');
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

    const { title, image, content, expectedDate } = req.body;

    bucketlists
      .create({
        title,
        image,
        content,
        likeCount: 0,
        expectedDate,
        user_id: userId,
      })
      .then(result => res.status(200).json(result))
      .catch(err => {
        console.log(err);
        res.status(404).send(err);
      });
  },
};
