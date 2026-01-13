# 할일 관리 앱 (Todo React)

React와 Vite를 사용한 할일 관리 애플리케이션입니다.

## 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 백엔드 서버 설정

**로컬 개발 (기본):**
- 환경 변수를 설정하지 않으면 자동으로 로컬 백엔드(`localhost:5000`)를 사용합니다
- Vite 프록시를 통해 연결되므로 별도 설정이 필요 없습니다
- 로컬 백엔드 서버가 `localhost:5000`에서 실행 중이어야 합니다

**로컬에서 Heroku 백엔드를 사용하려면 (선택사항):**
`.env.local` 파일을 생성하고 다음을 추가하세요:
```
VITE_API_BASE_URL=https://vibe-todo-backends-eaa7d6f19e23.herokuapp.com
```

**프로덕션 배포 (Heroku):**
- Heroku Config Vars에 다음을 설정하세요:
  - `VITE_API_BASE_URL` = `https://vibe-todo-backends-eaa7d6f19e23.herokuapp.com`

### 3. 프론트엔드 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:5173` (또는 Vite가 표시하는 주소)로 접속하세요.

**참고:** 기본 설정은 로컬 백엔드 서버(`localhost:5000`)를 사용합니다. 로컬 백엔드 서버를 실행해야 합니다.

## 중요 사항

### 환경 변수 사용
- **로컬 개발**: 기본적으로 로컬 백엔드(`localhost:5000`)를 사용합니다 (프록시 사용)
- **로컬에서 Heroku 백엔드 사용**: `.env.local` 파일에 `VITE_API_BASE_URL=https://vibe-todo-backends-eaa7d6f19e23.herokuapp.com` 설정
- **프로덕션 배포**: Heroku Config Vars에 `VITE_API_BASE_URL=https://vibe-todo-backends-eaa7d6f19e23.herokuapp.com` 설정
- 환경 변수는 `VITE_` 접두사가 필요합니다 (Vite 요구사항)
- `App.jsx`에서도 환경 변수를 사용할 수 있습니다 (`src/config/api.js` 참조)

### 개발 서버
- 프론트엔드 앱은 Vite 개발 서버를 통해 실행됩니다 (`npm run dev`)
- 환경 변수가 변경되면 개발 서버를 재시작해야 합니다

## API 엔드포인트

백엔드 서버의 라우터 설정에 따라 다음 중 하나를 사용합니다:
- `/api/todos` (라우터가 `/api`에 마운트된 경우)
- `/todos` (라우터가 루트에 마운트된 경우)

앱은 자동으로 두 경로를 시도합니다.

## 빌드

프로덕션 빌드:
```bash
npm run build
```

빌드 미리보기:
```bash
npm run preview
```
