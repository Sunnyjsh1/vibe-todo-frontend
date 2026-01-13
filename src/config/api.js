// API 설정 파일
// App.jsx에서도 사용할 수 있도록 별도 파일로 분리

// Heroku 배포된 백엔드 주소
export const HEROKU_API_URL = 'https://vibe-todo-backends-eaa7d6f19e23.herokuapp.com';

// 환경 변수에서 API 주소 가져오기
// 기본적으로 Heroku 백엔드를 사용합니다
// 로컬 백엔드를 사용하려면 .env 파일에 VITE_API_BASE_URL=http://localhost:5000 설정
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || HEROKU_API_URL;

// 현재 사용 중인 API 주소
export const getCurrentApiUrl = () => {
  return API_BASE_URL;
};

// 디버깅용
console.log('API Base URL:', API_BASE_URL);
