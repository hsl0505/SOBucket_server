/* eslint-disable arrow-parens */
const { bucketlists } = require('../../models');

module.exports = {
  post: (req, res) => {
    const { bucketId } = req.body;
    console.log('body', req.body);
    console.log(bucketId);
    bucketlists
      .destroy({ where: { id: bucketId } })
      .then(() => {
        res.status(200).send('ok');
      })
      .catch(err => {
        console.log(err);
        res.status(404).send(err);
      });
  },
};
