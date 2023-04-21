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
|FrontEnd|BackEnd|Stoarage|Domain|
|:---:|:---:|:---:|:---:|
|<img width="90" height="60" src="https://devopedia.org/images/article/397/9618.1642936094.png">|<img width="90" height="90" src="https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6a9c0584-cd27-4d1c-9555-fdbb8942ca34%2Fcloudtype_logo_vertical.png&blockId=c38f4d8c-2d4b-4640-a793-d8970dca47ab">|<img width="50" height="60" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Amazon-S3-Logo.svg/642px-Amazon-S3-Logo.svg.png?20220427001138">|<img width="60" height="50" src="https://company.gabia.com/assets/images/intro/img_gabia-logo.svg">|
|<a href="https://netlify.com/">Netlify</a>|<a href="https://cloudtype.io/">cloudtype</a>|<a href="https://aws.amazon.com/ko/s3/?nc2=h_ql_prod_st_s3">Amazone S3</a>|<a href="https://www.gabia.com/">Gabia</a>|

[➡️ 서비스 둘러보기](https://poka-trade.site/)  

### 관리자 계정
> ID: admin  
> PW: admin

### 사용자 계정
> ID: user1  
> PW: 1234

> ID: wannav  
> PW: 1234  

> 이외에 추가로 회원가입 해서 등록도 가능합니다.


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

## ✏️ 배운 점 & 아쉬운 점

### TypeScript
#### 배운 점
이번에 `TypeScript` 를 처음으로 사용해보게 되었습니다.  
`interface` 와 `type` 키워드로 새로운 타입을 만들고, 변수들의 타입을 명시적으로 지정해줌으로써 잘못된 동작을 방지할 수 있다는 점이 매력적이었습니다.  
또한 변수의 타입이 명확하기 때문에 IDE의 자동완성 기능이 정교해지는데 이 또한 편리함을 가져다 주었습니다.  

#### 아쉬운 점
`TypeScript`는 `JavaScript`의 Super-Set 언어이기 때문에 가볍게 생각하고 적용했지만, 타입 지정이나 간단한 제네릭을 제외하고는 많이 활용하지 못한 부분이 아쉽습니다.  
핸드북이 굉장히 잘 되어있기 때문에 정독하면서 잘 몰랐던 기능들을 정리해 볼 필요성을 느꼈습니다.

### React-Query
#### 배운 점
리액트 앱에서 백엔드 서버나 데이터베이스가 가지고 있는 정보를 가져오기 위해 비동기 요청이 발생하는데 각각의 API마다 `Success`, `Loading`, `Error` 등의 상태를 어떻게 관리할 것인지, 또 받아온 데이터는 어디에 저장할 것인지에 대한 고민이 있었습니다.  
이번에 서버 상태를 관리하는 `React-Query` 를 도입해 보았는데 각 데이터에 대한 쿼리 키만 잘 정리하면 요청의 상태를 관리하는 보일러 플레이트를 중복적으로 작성하지 않아도 서버로부터 데이터를 쉽게 가져올 수 있다는 점이 편리했습니다.  

#### 아쉬운 점
로딩 상태에는 원래 컴포넌트와 유사한 형태의 스켈레톤 UI를 보여주도록 작성했는데, 패칭 완료 이후에 가져온 데이터가 없는 경우에는 오히려 부자연스럽게 보였습니다.  
또한 로딩 화면에서 실제 화면으로 변화하는 모습을 보여주는 것 보다 백그라운드에서 미리 필요한 데이터를 프리패칭 해서 가져온다면 더 자연스럽게 보여줄 수 있을 텐데 추후에 이런 부분을 개선해 보면 좋을 것입니다.

### Express-Validator
#### 배운 점
클라이언트로부터 넘어온 요청의 데이터의 형태를 가지고 처리를 하기 전에 유효성을 검사해야 하는데 이런 부분을 손쉽게 처리할 수 있었습니다.  
`param`, `query`, `body` 에 담겨진 각 데이터의 타입이나 범위를 지정한다거나, 기본 값을 준다거나, 전처리 과정으로 데이터를 가공하는 것이 편해졌습니다.  

#### 아쉬운 점
데이터를 가지고 데이터베이스에서 조회한 뒤에 수행해야 하는 유효성 검사 부분도 있었는데, 이 부분도 `custom()` 을 활용해서 할 방법이 있을 것 같은데 데이터베이스에서 조회한 내용을 이후의 미들웨어로 전달하는 방법이 고민되어서 적용하지 못했습니다. 추후에 좋은 방법을 떠올려서 개선해 보면 좋을 것입니다.  

## 🚀 구현 기능

### 포토카드 목록 조회
- 서비스에 등록된 포토카드 목록을 관리자가 조회하는 기능입니다.
- 상단의 추가 버튼을 누르면 포토카드 등록 페이지로 이동합니다.
- 검색바에 포토카드 이름을 입력하고 엔터를 입력하면 해당 이름이 들어간 포토카드 목록만 조회할 수 있습니다.
- 그룹과 멤버의 드롭다운 메뉴를 통해 특정 그룹이나 멤버의 포토카드 목록만 조회할 수 있습니다.
- 검색 필터의 정보는 라벨 형태로 보이는데, X 버튼을 눌러서 해당 검색 필터를 제거할 수 있습니다.
- 각 포토카드 아이템에 존재하는 화살표 아이콘을 클릭하면 해당 포토카드의 상세 정보 페이지로 이동합니다.
<img width="750" src="https://user-images.githubusercontent.com/50488780/233640141-954a38f8-2ab6-4257-90c4-25718e481335.png">

### 포토카드 등록
- 서비스에서 취급할 포토카드 데이터를 관리자가 등록하는 기능입니다.
- 미리 등록해놓은 그룹과 멤버를 선택하고, 해당 멤버에 대한 포토카드 정보를 등록합니다.
- 이미지 파일을 업로드하면 하단의 등록할 포토카드 정보에 새로운 포토카드가 추가됩니다.
- 등록할 포토카드 정보에서 포토카드의 이름을 적거나 취소 버튼으로 등록을 취소할 수 있습니다.
- 하단의 취소 버튼을 누르면 포토카드 목록 페이지로 이동하고, 작성 버튼을 누르면 백엔드 서버에 등록 요청을 하고 포토카드 목록 페이지로 이동하게 됩니다.
<img width="750" src="https://user-images.githubusercontent.com/50488780/233639074-39fa0edb-93a8-4186-9e8a-6c0e0278e61e.png">
