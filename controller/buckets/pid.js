const { bucketlists } = require('../../models');

module.exports = {
  get: (req, res) => {
    bucketlists
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then(result => {
        console.log(result);
        res.status(200).json(result.dataValues);
      })
      .catch(err => {
        console.log(err);
        res.status(404).send(err);
      });
  },
};
