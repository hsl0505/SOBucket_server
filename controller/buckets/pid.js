const { bucketlists, users, comments, likes } = require('../../models');
const { isValid } = require('../../utils/tokenhelper');

module.exports = {
  get: (req, res) => {
    const { token } = req.cookies;
    let userId = null;
    let resObj;

    if (token) {
      isValid(token, validToken => {
        userId = validToken.userInfo.id;
      });
    }

    bucketlists
      .findOne({
        include: [
          { model: users, attributes: ['userNickName', 'avatar'] },
          { model: likes, attributes: ['user_id'] },
        ],
        where: {
          id: req.params.id,
        },
      })
      .then(result => {
        // console.log(result.dataValues);
        resObj = result.dataValues;
        resObj.mylike = false;
        for (let i = 0; i < result.likes.length; i++) {
          if (result.likes[i].user_id === userId) {
            resObj.mylike = true;
            break;
          }
        }
        console.log('mylike', resObj.mylike);

        comments
          .findAll({
            include: [{ model: users, attributes: ['userNickName', 'avatar'] }],
            where: {
              bucket_id: req.params.id,
            },
          })
          .then(comment => {
            // console.log(comment[0]);
            const commentsByBucketId = comment.map(ele => ele.dataValues);
            console.log('commentsByBucketId : ', commentsByBucketId);
            resObj.comments = commentsByBucketId;
            res.status(200).json(resObj);
          });
      })
      .catch(err => {
        console.log(err);
        res.status(404).send(err);
      });
  },
};
