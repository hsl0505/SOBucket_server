const AWS = require('aws-sdk');
require('dotenv').config();

const s3bucketName = process.env.S3_BUCKETNAME;
const bucketRegion = process.env.S3_REGION;
const IdentityPoolId = process.env.S3_POOLID;

const multer = require('multer');
const multerS3 = require('multer-s3');
const { isValid } = require('./tokenhelper');

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: s3bucketName },
});

const storage = multerS3({
  s3: s3,
  bucket: s3bucketName, // s3 생성시 버킷명
  acl: 'public-read', // 업로드 된 데이터를 URL로 읽을 때 설정하는 값
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname }); // 파일 메타정보 저장
  },
  key: (req, file, cb) => {
    const { token } = req.cookies;
    console.log('token : ', token);
    let userId = 'no_user_id';
    if (token) {
      isValid(token, validToken => {
        userId = validToken.userInfo.id;
      });
    }
    cb(null, `${userId}_avatar_${file.originalname}`); // key, 저장될 파일명과 같이 저장
  },
});

const uploadToS3 = multer({ storage: storage }).single('file');

// db에서 읽어온 경로가 파라미터
const retrieveFromS3 = (path, callback) => {
  const retrieveParams = { Bucket: s3bucketName, Key: path };
  s3.getObject(retrieveParams, callback);
};
module.exports = { uploadToS3, retrieveFromS3 };
