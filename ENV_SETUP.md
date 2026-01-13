# 환경 변수 설정 가이드

## ⚠️ 중요: 로컬 개발 환경

**로컬 개발 시 `.env` 파일에 Heroku 주소를 넣지 마세요!**

### 올바른 설정

#### 로컬 개발 (기본 - 권장)
- `.env` 파일을 **만들지 않거나** 비워두세요
- 자동으로 로컬 백엔드(`localhost:5000`)를 사용합니다
- Vite 프록시를 통해 연결됩니다

#### 로컬에서 Heroku 백엔드 테스트 (선택사항)
만약 로컬에서 Heroku 백엔드를 테스트하고 싶다면:
- `.env.local` 파일을 생성하고 다음을 추가:
  ```
  VITE_API_BASE_URL=https://vibe-todo-backends-eaa7d6f19e23.herokuapp.com
  ```
- ⚠️ `.env.local`은 Git에 커밋되지 않습니다 (`.gitignore`에 포함됨)

## 프로덕션 배포 (Heroku)

### Heroku Config Vars 설정

Heroku Dashboard에서:
1. Settings → Config Vars
2. `VITE_API_BASE_URL` 추가
3. 값: `https://vibe-todo-backends-eaa7d6f19e23.herokuapp.com`

또는 Heroku CLI로:
```bash
heroku config:set VITE_API_BASE_URL=https://vibe-todo-backends-eaa7d6f19e23.herokuapp.com
```

## 요약

| 환경 | .env 파일 | Heroku Config Vars | 사용되는 백엔드 |
|------|-----------|-------------------|----------------|
| 로컬 개발 (기본) | 없음 | - | `localhost:5000` (프록시) |
| 로컬 개발 (Heroku 테스트) | `.env.local`에 Heroku 주소 | - | Heroku 백엔드 |
| 프로덕션 (Heroku) | - | Heroku 주소 설정 | Heroku 백엔드 |

## 확인 방법

브라우저 콘솔에서 확인:
```javascript
console.log(import.meta.env.VITE_API_BASE_URL)
```

또는 앱 헤더에 표시되는 "현재 API" 주소를 확인하세요.
