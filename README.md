![버킷로고](https://user-images.githubusercontent.com/53073832/76163712-d7609180-618b-11ea-9f89-f8259fcaf261.png)

# SO Bucket

**SO Bucket**은 자신의 버킷리스트를 관리하고 다른 사람과 공유할 수 있는 웹 어플리케이션 프로젝트 입니다.

</br>

### 프로젝트 개요

**프로젝트 기간** : 2020.01.13 ~ 2020.01.23

**서비스 종류** : Web Application

**프로젝트 참여 인원** : Full-Stack 3명

- 서지훈 (팀장, Full-Stack)
- 안상욱 (팀원, Full-Stack)
- **임현성 (팀원, Full-Stack)**

  - Front
    - React-router-dom을 활용하여 주요 화면 별 라우팅 설계 및 이를 통한 SPA 구현
    - Card, Like, Fork button 등 재사용 가능한 컴포넌트 설계
    - 빠른 UI 구현을 위해 AntDesign 활용
    - 좋아요 토글 및 퍼가기 기능 구현
    - 웹 CSS 구현
  - Back
    - Sequelize ORM을 활용하여 Client에서 맡은 기능 동작에 필요한 API를 endpoint별로 구현
    - Client와 Server간 쿠키와 JWT를 활용하여 Authorization 구현
    
</br>

**SO Bucket 주요 기능**

- 로그인 / 로그아웃 / 회원가입 / 회원탈퇴
- 회원정보 열람 / 수정
- Bucket 등록 / 수정 / 삭제
- Bucket 검색 (title로)
- Bucket 좋아요 / 퍼가기

</br>

### 프로젝트 관리

- Notion을 이용하여 프로젝트 전반적인 기획 및 관리

  - team rule, step, task, api 문서 등

- Miro를 이용하여 프로젝트 전체 레이아웃 설계

- dbdiagram.io를 이용하여 데이터베이스 설계

- 애자일 스크럼 방식을 이용하여 스프린트 단위의 개발 진행관리

- ESLint, Prettier를 이용하여 코드 스타일 통일

</br>

### 사용한 기술 스택

**Front-End**

- React
- React-router-dom
- Ant

**Back-End**

- Node.js
- Express
- JWT
- MySQL
- Sequelize ORM

**Development**

- Git
- AWS (S3)

</br>

### 프로젝트 아키텍쳐

![버킷 아키텍쳐](https://user-images.githubusercontent.com/53073832/76164225-8dc67580-6190-11ea-9645-921649992c22.png)

</br>
</br>

# Back-End

### Directory Structure
```
SO Bucket Server
├── README.md
├── app.js
├── config
├── controller
│   ├── buckets
│   ├── index.js
│   └── user
├── env.sample
├── migrations
├── models
├── package.json
├── routes
└── utils
```

</br>

## Database Schima
![database_schima()](https://user-images.githubusercontent.com/53073832/76617519-cb007e00-6569-11ea-908f-e1e4f4c898bf.png)

</br>

## API Documentation  (내가 구현한 부분)

### Controller

- buckets : 버킷에 관한 모든 것을 담당하는 컨트롤러입니다
- user : 유저에 관한 모든 것을 담당하는 컨트롤러입니다

Base URL : http://127.0.0.1:3001

</br>

### # buckets controller

</br>

**POST / deleteBucket**

버킷 삭제

```
/buckets/deleteBucket
```

Headers
```JSON
{
  "Content-Type" : "application/json",
}
```

Body
```JSON
{
  "bucketId" : "1"
}
```

Response
```
// 응답 성공 - 200
'ok'

// 응답 실패 - 404
```

</br>
</br>

**GET / mypage**

mypage에서 자신이 작성한 버킷 목록 받아오기

```
/buckets/mypage
```

Response
```
// 응답 성공 - 200
{
    "bucketlists": [
        {
            "id": 7,
            "title": "타이틀테스트7",
            "image": "이미지테스트7",
            "content": "내용테스트7",
            "likeCount": 6,
            "expectedDate": "2020-01-22T09:46:08.000Z",
            "user_id": 2,
            "createdAt": "2020-01-22T09:46:08.000Z",
            "updatedAt": "2020-03-09T10:12:18.000Z",
            "user": {
                "userNickName": "현성2",
                "avatar": "example"
            },
            "likes": [
                {
                    "user_id": 6
                },
                {
                    "user_id": 7
                },
                {
                    "user_id": 8
                },
                {
                    "user_id": 16
                },
                {
                    "user_id": 2
                }
            ],
            "mylike": true
        },
        
        ...
        
    ]
}


// 응답 실패 - 404
```

</br>
</br>

**GET / findLikeList**

mypage에서 자신이 좋아요 누른 버킷 목록 받아오기

```
/buckets/findLikeList
```

Response
```
// 응답 성공 - 200
{
    "likeList": [
        {
            "id": 12,
            "title": "타이틀테스트12",
            "image": "이미지테스트12",
            "content": "내용테스트12",
            "likeCount": 5,
            "expectedDate": "2020-01-22T09:46:08.000Z",
            "user_id": 3,
            "createdAt": "2020-01-22T09:46:08.000Z",
            "updatedAt": "2020-03-09T10:12:19.000Z",
            "likes": [
                {
                    "user_id": 2
                }
            ],
            "user": {
                "userNickName": "현성5",
                "avatar": "example"
            },
            "mylike": true
        }
    ]
}


// 응답 실패 - 404
```

</br>
</br>

**POST / fork**

버킷 퍼가기

```
/buckets/fork
```

Headers
```JSON
{
  "Content-Type" : "application/json",
}
```

Body
```JSON
{
  "title" : "타이틀",
  "image" : "버킷이미지 url",
  "content": "내용",
  "expectedDate": "2020-00-00",
}
```

Response
```
// 응답 성공 - 200
{
  id: 27
  title: "타이틀테스트17"
  image: "이미지테스트17"
  content: "내용테스트17"
  likeCount: 0
  expectedDate: "2020-01-22T09:46:08.000Z"
  user_id: 2
  updatedAt: "2020-03-09T10:22:29.331Z"
  createdAt: "2020-03-09T10:22:29.331Z"
}

// 응답 실패 - 404
```

</br>
</br>

**GET / home**

홈 화면에 나올 버킷 가져오기 (랜덤 8개)

```
/buckets/home
```

Response
```
// 응답 성공 - 200
{
    "bucketList": [
        {
            "id": 10,
            "title": "타이틀테스트10",
            "content": "내용테스트10",
            "image": "이미지테스트10",
            "expectedDate": "2020-01-22T09:46:08.000Z",
            "createdAt": "2020-01-22T09:46:08.000Z",
            "likeCount": 0,
            "userNickName": "현성2",
            "mylike": false
        },
        {
            "id": 18,
            "title": "타이틀테스트18",
            "content": "내용테스트18",
            "image": "이미지테스트18",
            "expectedDate": "2020-01-22T09:46:08.000Z",
            "createdAt": "2020-01-22T09:46:08.000Z",
            "likeCount": 0,
            "userNickName": "현성3",
            "mylike": false
        },
        
        ... (총 8개)
        
    ]
}

// 응답 실패 - 404
```

</br>
</br>

**GET / today**

홈 화면에 나올 베스트 버킷 가져오기 (좋아요 많은 순서대로 4개)

```
/buckets/home/today
```

Response
```
// 응답 성공 - 200
{
    "todayBucketList": [
        {
            "id": 7,
            "title": "타이틀테스트7",
            "content": "내용테스트7",
            "image": "이미지테스트7",
            "expectedDate": "2020-01-22T09:46:08.000Z",
            "createdAt": "2020-01-22T09:46:08.000Z",
            "likeCount": 6,
            "userNickName": "현성2",
            "mylike": true
        },
        {
            "id": 12,
            "title": "타이틀테스트12",
            "content": "내용테스트12",
            "image": "이미지테스트12",
            "expectedDate": "2020-01-22T09:46:08.000Z",
            "createdAt": "2020-01-22T09:46:08.000Z",
            "likeCount": 5,
            "userNickName": "현성5",
            "mylike": true
        },
        
        ... (총 4개)
        
    ]
}

// 응답 실패 - 404
```

</br>
</br>

**POST / like**

버킷에 좋아요 토글 기능

```
/buckets/like
```

Headers
```JSON
{
  "Content-Type" : "application/json",
}
```

Body
```
{ 
  "isLike" : "false", // false일 시 좋아요 활성시킴, true이면 좋아요 비활성
  "bucketId" : "5" 
}
```

Response
```
// 응답 성공 - 200
'ok'

// 응답 실패 - 404
```

</br>
</br>

**GET / search**

버킷 검색

```
/buckets/search/?q="searchValue"
```

Response
```
// 응답 성공 - 200
{
    "searchBuckets": [
        {
            "id": 15,
            "title": "타이틀테스트15",
            "content": "내용테스트15",
            "image": "이미지테스트15",
            "expectedDate": "2020-01-22T09:46:08.000Z",
            "createdAt": "2020-01-22T09:46:08.000Z",
            "likeCount": 0,
            "userNickName": "현성5",
            "mylike": false
        }
    ]
}

// 응답 성공 - 일치하는 버킷 없을 시, 200
{
    "searchBuckets": []
}


// 응답 실패 - 404
```

</br>
</br>

**POST / test**

client 및 server test를 위한 faks data 생성 api

```
/buckets/test
```

Response
```
/*
  유저는 15명, 피드는 20개, 각 피드는 좋아요 0~19개, 좋아요 총 갯수는 15개, 코멘트는 0개
    1번 유저 : 피드 6개 (1~6) / 1번 피드 5개 (1,2,3,4,5 유저)
    2번 유저 : 피드 5개 (7 ~ 11) / 7번피드 4개 (6,7,8,9 유저)
    3번 유저 : 피드 4개 (12 ~ 15)/ 12번피드 3개 (10,11,12 유저)
    4번 유저 : 피드 3개 (16~ 18)/ 16번 피드 2개 (13,14 유저)
    5번 유저 : 피드 2개 (19,20)/ 19번 피드 1개 (15유저)
    6번 유저~ 15번유저 : 피드 0개
*/
```

</br>
</br>



### # user controller

</br>

**POST / login**

유저 로그인

```
/user/login
```

Headers
```JSON
{
  "Content-Type" : "application/json",
}
```

Body
```
{
  "email" : "2@2",
  "password" : "2"
}
```

Response
```
// 응답 성공 - 200
{
    "id": 2,
    "userNickName": "현성2"
}

// 응답 실패 - 404
"invaild user"
```

</br>
</br>

**POST / logout**

유저 로그아웃

```
/user/logout
```

Body
```
{}
```

Response
```
// 응답 성공 - 200
// clearCookie (토큰이 담겨있는 쿠키 삭제)
```

</br>
</br>

**POST / resign**

유저 회원탈퇴

```
/user/resign
```

Headers
```JSON
{
  "Content-Type" : "application/json",
}
```

Body
```
{}
```

Response
```
// 응답 성공 - 200
// clearCookie (토큰 담겨있는 쿠키 삭제)
'ok'
```

</br>
</br>


## ETC

![토큰-쿠키1](https://user-images.githubusercontent.com/53073832/76211428-8dd67c00-6249-11ea-9feb-a32a88e330ab.png)
</br>

- JWT를 쿠키를 통해 주고받기 위해 Server app.js에서 cors middleware credential 설정

</br>

![쿠키_토큰2](https://user-images.githubusercontent.com/53073832/76211423-8ca54f00-6249-11ea-9c32-6ff22460a4ac.png)
</br>

- fetch api 사용 시, 쿠키 등 auth 관련 데이터를 주고 받기 위하여 credential 설정
</br>

![토큰_쿠키3](https://user-images.githubusercontent.com/53073832/76211429-8e6f1280-6249-11ea-8148-543c6d41ffe8.png)
</br>

- 로그인 시, http 응답에 cookie 설정하여 JWT를 담아보내줌, 이후 http 요청과 응답 시 쿠키에 JWT 존재
</br>
</br>



