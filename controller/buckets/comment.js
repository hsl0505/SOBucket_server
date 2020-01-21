const { comments } = require('../../models');

const { isValid } = require('../../utils/tokenhelper');

module.exports = {
  post: (req, res) => {
    const { content, bucket_id } = req.body;
    let userId = 'Anonymous';
    isValid(token, validToken => {
      userId = validToken.userInfo.id;
    });
    comments.create({
      user_id: userId,
      content: content,
      bucket_id: bucket_id,
    });
  },
};
