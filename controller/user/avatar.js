const multer = require('multer');
// const fs = require('fs');
const { users } = require('../../models');
const { uploadToS3 } = require('../../utils/imagehelper');
const { isValid } = require('../../utils/tokenhelper');

module.exports = {
  post: (req, res, next) => {
    // console.log('uploadToS3 : ', uploadToS3);
    // console.log('req.body : ', req.body); // multer없이 body를 읽을 수 없음.
    uploadToS3(req, res, (err, data) => {
      if (err instanceof multer.MulterError) {
        console.log('instance error : ', err);
        return next(err);
      }
      if (err) {
        console.log('second error : ', err);
        return next(err);
      }
      console.log(
        '==================================================================================================================',
      );
      //   console.log('req : ', req);
      // console.log('원본파일명 : ', req.file.originalname);
      // console.log('크기 : ', req.file.size);
      console.log('경로 : ', req.file.location); // s3 업로드시 업로드 url을 가져옴

      let userId = '';
      isValid(req.cookies.token, validToken => {
        userId = validToken.userInfo.id;
      });
      users
        .update(
          { avatar: `${req.file.location}` },
          {
            where: { id: userId },
          },
        )
        .catch(err => {
          res.sendStatus(400);
        });

      return res.sendStatus(200);
    });
  },
};
