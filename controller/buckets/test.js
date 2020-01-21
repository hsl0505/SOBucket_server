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
    유저는 15명, 피드는 20개, 각 피드는 좋아요 0~19개, 좋아요 총 갯수는 15개, 코멘트는 0개
    1번 유저 : 피드 6개 (1~6) / 1번 피드 5개 (1,2,3,4,5 유저)
    2번 유저 : 피드 5개 (7 ~ 11) / 7번피드 4개 (6,7,8,9 유저)
    3번 유저 : 피드 4개 (12 ~ 15)/ 12번피드 3개 (10,11,12 유저)
    4번 유저 : 피드 3개 (16~ 18)/ 16번 피드 2개 (13,14 유저)
    5번 유저 : 피드 2개 (19,20)/ 19번 피드 1개 (15유저)
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
        likeCount: 0,
        expectedDate: new Date(),
      };
      if (i >= 1 && i <= 6) {
        if (i === 1) {
          obj.likeCount = 5;
        }
        obj.user_id = 1;
      } else if (i >= 7 && i <= 11) {
        if (i === 7) {
          obj.likeCount = 4;
        }
        obj.user_id = 2;
      } else if (i >= 12 && i <= 15) {
        if (i === 12) {
          obj.likeCount = 3;
        }
        obj.user_id = 3;
      } else if (i >= 16 && i <= 18) {
        if (i === 16) {
          obj.likeCount = 2;
        }
        obj.user_id = 4;
      } else if (i >= 19 && i <= 20) {
        if (i === 19) {
          obj.likeCount = 1;
        }
        obj.user_id = 5;
      }
      bucketArr.push(obj);
    }

    // 좋아요 생성
    const likeArr = [];
    for (let i = 1; i <= 15; i++) {
      const obj = {};
      obj.user_id = i;
      if (i >= 1 && i <= 5) {
        obj.bucket_id = 1;
      } else if (i >= 6 && i <= 9) {
        obj.bucket_id = 7;
      } else if (i >= 10 && i <= 12) {
        obj.bucket_id = 12;
      } else if (i >= 13 && i <= 14) {
        obj.bucket_id = 16;
      } else if (i === 15) {
        obj.bucket_id = 9;
      }
      likeArr.push(obj);
    }

    users.bulkCreate(userArr, { individualHooks: true }).then(() => {
      bucketlists.bulkCreate(bucketArr).then(() => {
        likes.bulkCreate(likeArr).then(() => res.status(200).send('ok'));
      });
    });
  },
};
