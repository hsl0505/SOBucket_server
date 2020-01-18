const { users } = require('../../models');

const { uploadToS3, retrieveFromS3 } = require('../../utils/imagehelper');

module.exports = {
  get: (req, res) => {},
  post: (req, res) => {
    const { file, userNickName, password, phone } = req;
    const key = userNickName; // 다른 키설정 찾아야 함 = 고유하면서 변동이 없어야..
    uploadToS3(file, key, (err, data) => {
      if (err) {
        console.log('Error', err);
        res.sendStatus(400);
      }
      if (data) {
        console.log('Upload Success : ', data.Location);
        users
          .update(
            {
              userNickName: userNickName,
              password: password,
              phone: phone,
              avatar: key,
            },
            {
              where: {
                id: id,
              },
            },
          )
          .then(result => {
            retrieveFromS3(result.avatar, (err, data) => {
              if (err) {
                throw err;
              }
              console.log('retrieve data from s3 : ', data);
              // // dataURL
              // let dataURL = 'data:image/jpeg;base64,' + encode(data.Body);

              // // blobURL
              // const blob = new Blob([data.Body], {
              //   type: data.ContentType,
              // });
              // const blobURL = URL.createObjectURL(blob);
              res.status(200).json(data);
            });
          })
          .catch(err => {
            console.error(err);
          });
      }
    });
  },
};
