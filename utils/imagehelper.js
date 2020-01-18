const AWS = require('aws-sdk');

const s3bucketName = 'practice-sobucket-image';
const bucketRegion = 'ap-northeast-2'; // 아시아 태평양 (서울)
const IdentityPoolId = 'ap-northeast-2:b25ab6a0-f378-4576-84b9-29780bcc172f';

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

// client에서 보내준 파일이 파라미터, key는 이메일로 해쉬할 것
const uploadToS3 = (file, key, callback) => {
  const uploadParams = { Bucket: s3bucketName, Key: key, Body: '' };

  // Configure the file stream and obtain the upload parameters body
  const fs = require('fs');
  const fileStream = fs.createReadStream(file);
  fileStream.on('error', err => {
    console.log('File Error', err);
  });
  uploadParams.Body = fileStream;

  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, callback);
};

// db에서 읽어온 경로가 파라미터
const retrieveFromS3 = (path, callback) => {
  const retrieveParams = { Bucket: s3bucketName, Key: path };
  s3.getObject(retrieveParams, callback);
};
module.exports = { uploadToS3, retrieveFromS3 };
