const FormData = require('form-data');

const fs = require('fs');

const { users } = require('../../models');

const { isValid } = require('../../utils/tokenhelper');

module.exports = {
  get: (req, res) => {
    const { token } = req.cookies;
    let userId = '';
    const formdata = new FormData();
    isValid(token, validToken => {
      userId = validToken.userInfo.id;
    });
    users.findOne({ where: { id: userId } }).then(result => {
      console.log('info DB result : ', result);
      const {
        email,
        userName,
        userNickName,
        phone,
        createdAt,
        avatar,
      } = result;

      formdata.append('avatar', fs.createReadStream(avatar));
      formdata.append(
        'json',
        JSON.stringify({ email, userName, userNickName, phone, createdAt }),
      );
      res.status(200).send(formdata);
    });
  },
  post: (req, res) => {
    const { userNickName, password, phone } = req.body;
    const { token } = req.cookies;
    let userId;
    isValid(token, validToken => {
      userId = validToken.userInfo.id;
    });
    console.log(userNickName, password, phone);
    users
      .update(
        {
          userNickName,
          password,
          phone,
        },
        {
          where: {
            id: userId,
          },
          individualHooks: true,
        },
      )
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.sendStatus(400);
      });
  },
};
