const { bucketlists } = require('../../models');

const { isValid } = require('../../utils/tokenhelper');

module.exports = {
  post: (req, res) => {
    const { title, content, image, expectedDate } = req.body;
    let userId = '';
    isValid(token, validToken => {
      userId = validToken.userInfo.id;
    });
    bucketlists
      .create({
        title,
        content,
        image,
        expectedDate,
      })
      .catch(err => res.sendStatus(400));
    res.staus(200).send('OK');
  },
};
