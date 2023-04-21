# 🖼️ 아이돌 포토카드 교환 플랫폼 Poka 🖼️
음반 앨범에 동봉된 포토카드를 마음껏 원하는 것으로 교환하세요!

## ❓ 기획 배경
음반 앨범에 동봉되어 있는 아이돌 멤버의 포토카드는 랜덤이기 때문에 자신이 원하는 포토카드를 뽑기 어려울 수 있습니다.  
그래서 소유한 포토카드를 자신이 원하는 것으로 교환하는 서비스를 기획했습니다.

## 🚀 주요 기능
### 사용자
- 내가 원하는 포토카드로의 교환을 등록하거나, 이미 등록된 교환 중에서 원하는 것이 있다면 바로 교환
- 내가 가지고 있는 소유권을 조회하고, 관리자에게 배송 요청
- 내 닉네임과 프로필 이미지를 수정하고, 배송지 정보 설정

### 관리자
- 플랫폼에서 취급하는 아이돌 그룹과 멤버, 포토카드 정보를 관리
- 사용자에게 소유권을 발급하고, 소유권의 거래 내역 확인
- 사용자가 배송 요청한 소유권을 발송 처리

## 🖥️ 배포
[➡️ 서비스 둘러보기](https://poka-trade.site/)  

<a href="https://netlify.com/"><img src="https://img.shields.io/badge/Frontend-Netlify-9cf?style=for-the-badge" /></a>
<a href="https://cloudtype.io/"><img src="https://img.shields.io/badge/backend-cloudtype-black?style=for-the-badge" /></a>
<a href="https://aws.amazon.com/ko/s3/?nc2=h_ql_prod_st_s3"><img src="https://img.shields.io/badge/storage-amazone_s3-red?style=for-the-badge" /></a>

## 🔨 사용한 기술
### Front-End
![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)  
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)  
![](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)

### Back-End
![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)  
![](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)
![](https://img.shields.io/badge/Express_Validator-764ABC?style=for-the-badge&logo=cachet&logoColor=white)
![](https://img.shields.io/badge/multer-F46519?style=for-the-badge&logo=muller&logoColor=white)  
![](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)

## 배운 점 & 아쉬운 점

### TypeScript
#### 배운 점
이번 프로젝트에 만들면서 `TypeScript` 를 처음으로 사용해보게 되었다.  
`interface` 와 `type` 키워드로 새로운 타입을 만들고, 변수들의 타입을 명시적으로 지정해줌으로써 잘못된 동작을 방지할 수 있다는 점이 매력적이었다.  
또한 변수의 타입이 명확하기 때문에 IDE의 자동완성 기능이 정교해지는데 이 또한 편리함을 가져다 주었다.

#### 아쉬운 점
`TypeScript`는 `JavaScript`의 Super-Set 언어이기 때문에 대수롭지 않게 생각하고 적용했지만, 타입 지정이나 간단한 제네릭을 제외하고는 많이 활용하지 못한 부분이 아쉽다.  
핸드북이 굉장히 잘 되어있기 때문에 정독하면서 잘 몰랐던 기능들을 정리할 필요성이 있다.

### React-Query
#### 배운 점
리액트 앱에서 백엔드 서버나 데이터베이스가 가지고 있는 정보를 가져오기 위해 비동기 요청이 발생하는데 각각의 API마다 `Success`, `Loading`, `Error` 등의 상태를 어떻게 관리할 것인지, 또 받아온 데이터는 어디에 저장할 것인지에 대한 고민이 있었는데 이번에 서버 상태를 관리하는 `React-Query` 를 도입해봤다. 

