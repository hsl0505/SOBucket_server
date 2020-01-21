const multer = require('multer');
// const { bucketlists } = require('../../models');
const { uploadToS3 } = require('../../utils/imagehelper');
// const { isValid } = require('../../utils/tokenhelper');

module.exports = {
  post: (req, res, next) => {
    uploadToS3(req, res, (err, data) => {
      if (err instanceof multer.MulterError) {
        console.log('instance error : ', err);
        return next(err);
      }
      if (err) {
        console.log('second error : ', err);
        return next(err);
      }
      console.log('경로 : ', req.file.location); // s3 업로드시 업로드 url을 가져옴

      return res.status(200).send(req.file.location);
    });
  },
};
