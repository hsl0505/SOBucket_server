const { bucketlists } = require('../../models');

module.exports = {
  post: (req, res) => {
    const { id, title, content, image, expectedDate } = req.body;
    bucketlists
      .update(
        {
          title,
          content,
          image,
          expectedDate,
        },
        { where: { id } },
      )
      .then(result => {
        res.status(200).send('OK');
      })
      .catch(err => {
        console.log('err : ', err);
        res.sendStatus(400);
      });
  },
};
