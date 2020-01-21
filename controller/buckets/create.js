const { bucketlists } = require('../../models');

const { isValid } = require('../../utils/tokenhelper');

module.exports = {
  post: (req, res) => {
    const { token } = req.cookies;
    const { title, content, image, expectedDate } = req.body;
    let userId = '';
    isValid(token, validToken => {
      userId = validToken.userInfo.id;
    });
    bucketlists
      .create({
        user_id: userId,
        title,
        content,
        image,
        expectedDate,
      })
      .then(result => {
        res.status(200).send('OK');
      })
      .catch(err => {
        console.log('err : ', err);
        res.sendStatus(400);
      });
  },
};
