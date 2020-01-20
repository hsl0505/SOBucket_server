/* eslint-disable arrow-body-style */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const { bucketlists, users, likes } = require('../../models');

module.exports = {
  post: (req, res) => {
    console.log('test');
    // res.status(200).send('ok');
    const userArr = [];
    /*
    유저는 15명, 피드는 20개, 각 피드는 좋아요 0~19개, 좋아요 총 갯수는 210개, 코멘트는 0개
    1번 유저 : 피드 6개 (1~6) / 각 피드의 좋아요 갯수 (1 ~ 6)
    2번 유저 : 피드 5개 (7 ~ 11) / (7 ~ 11)
    3번 유저 : 피드 4개 (12 ~ 15)/ (12 ~ 15)
    4번 유저 : 피드 3개 (16~ 18)/ (16~ 18)
    5번 유저 : 피드 2개 (19,20)/ (19,20)
    6번 유저~ 15번유저 : 피드 0개
    */

    // 유저 생성 15명 (1번~15번유저)
    for (let i = 1; i <= 15; i++) {
      const obj = {
        email: `${i}@${i}`,
        userName: `임현성${i}`,
        userNickName: `현성${i}`,
        password: `${i}`,
        phone: `${i}-${i}-${i}`,
        avatar: 'example',
        signupDate: new Date(),
        isBlack: 'false',
        blackReason: '',
        auth: 'false',
      };
      userArr.push(obj);
    }

    // 피드 생성 20개
    const bucketArr = [];
    for (let i = 1; i <= 20; i++) {
      const obj = {
        title: `타이틀테스트${i}`,
        image: `이미지테스트${i}`,
        content: `내용테스트${i}`,
        likeCount: i,
        expectedDate: new Date(),
      };
      if (i >= 1 && i <= 6) {
        obj.user_id = 1;
      } else if (i >= 7 && i <= 11) {
        obj.user_id = 2;
      } else if (i >= 12 && i <= 15) {
        obj.user_id = 3;
      } else if (i >= 16 && i <= 18) {
        obj.user_id = 4;
      } else if (i >= 19 && i <= 20) {
        obj.user_id = 5;
      }
      bucketArr.push(obj);
    }

    // 좋아요 생성
    const likeArr = [];
    for (let i = 1; i <= 20; i++) {
      for (let j = 1; j <= i; j++) {
        const obj = {};
        obj.bucket_id = i;
        if (i >= 1 && i <= 6) {
          obj.user_id = 1;
        } else if (i >= 7 && i <= 11) {
          obj.user_id = 2;
        } else if (i >= 12 && i <= 15) {
          obj.user_id = 3;
        } else if (i >= 16 && i <= 18) {
          obj.user_id = 4;
        } else if (i >= 19 && i <= 20) {
          obj.user_id = 5;
        }
        likeArr.push(obj);
      }
    }

    users.bulkCreate(userArr).then(() => {
      bucketlists.bulkCreate(bucketArr).then(() => {
        likes.bulkCreate(likeArr).then(() => res.status(200).send('ok'));
      });
    });
  },
};
