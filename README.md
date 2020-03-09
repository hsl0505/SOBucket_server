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
    - Client 기본 구조 및 레이아웃 구현
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

### API Documentation  (내가 구현한 부분)

### Controller

- buckets : 버킷에 관한 모든 것을 담당하는 컨트롤러입니다
- user : 유저에 관한 모든 것을 담당하는 컨트롤러입니다

Base URL : http://127.0.0.1:3001

</br>

### buckets controller

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

**GET / findLikeList**

자신이 좋아요 누른 버킷 목록 받아오기

```
/buckets/findLikeList
```

Response
```
// 응답 성공 - 200



// 응답 실패

```

</br>
</br>

### user controller

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
```JSON
{
  "email" : "2@2",
  "password" : "2"
}
```

Response
```JSON
// 응답 성공 - 200
{
    "id": 2,
    "userNickName": "현성2"
}

// 응답 실패 - 404
"invaile user"
```

</br>
</br>





